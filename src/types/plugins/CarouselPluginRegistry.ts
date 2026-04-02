import type {CarouselPlugin} from "./CarouselPlugin";
import type {CarouselPluginApi} from "./CarouselPluginApi.ts";
import type {CarouselPluginKind} from "./CarouselPluginMeta.ts";

/**
 * Internal registry responsible for managing carousel plugins.
 *
 * Responsibilities:
 * - Registers plugins
 * - Filters plugins based on the current environment (target)
 * - Prevents duplicate plugin identifiers
 * - Manages plugin lifecycle (setup and destroy)
 *
 * The registry is environment-aware:
 * only plugins matching the current target will be registered.
 *
 * Example:
 * - target = 'production' → only production plugins are loaded
 * - target = 'development' → dev plugins can be enabled
 */
export class CarouselPluginRegistry {
    private readonly plugins = new Map<string, CarouselPlugin>();
    private booted: boolean = false;
    private readonly target: CarouselPluginKind;

    /**
     * Creates a new plugin registry.
     *
     * @param plugins Initial plugins to register
     * @param target Current execution environment
     *
     * The target controls which plugins are accepted.
     * If not specified, defaults to 'production'.
     */
    public constructor(
        plugins: readonly CarouselPlugin[] = [],
        target: CarouselPluginKind = 'production'
    ) {
        this.target = target;
        for (const plugin of plugins) {
            this.register(plugin);
        }
    }

    /**
     * Registers a plugin in the registry.
     *
     * The plugin is only registered if it supports the current target.
     * Otherwise, it is silently ignored.
     *
     * @throws Error when a plugin with the same name and version
     * is already registered.
     */
    public register(plugin: CarouselPlugin): void {
        // Check if the plugin target is matched
        if (!this.supportsTarget(plugin)) {
            return;
        }

        const id: string = this.getPluginId(plugin);

        if (this.plugins.has(id)) {
            throw new Error(`CONFLICT! Plugin "${id}" is already registered.`);
        }

        this.plugins.set(id, plugin);
    }

    /**
     * Returns true if the plugin is registered.
     *
     * Plugins filtered out by the target are considered not registered.
     */
    public has(plugin: CarouselPlugin): boolean {
        return this.plugins.has(this.getPluginId(plugin));
    }

    /**
     * Returns all registered plugins.
     *
     * The order matches the registration order.
     */
    public getAll(): readonly CarouselPlugin[] {
        return Array.from(this.plugins.values());
    }

    /**
     * Boots all registered plugins.
     *
     * Calls setup(api) on each plugin in registration order.
     *
     * This method is idempotent:
     * calling it multiple times will not re-run setup
     * unless the registry has been destroyed.
     */
    public boot(api: CarouselPluginApi): void {
        if (this.booted) {
            return;
        }

        this.booted = true;

        // We call all setup in registered plugins
        for (const plugin of this.plugins.values()) {
            plugin.setup(api);
        }
    }

    /**
     * Destroys all registered plugins.
     *
     * Calls destroy() on each plugin in reverse registration order.
     *
     * After destruction, the registry can be booted again.
     */
    public destroy(): void {
        const plugins = Array.from(this.plugins.values())
            .reverse();

        for (const plugin of plugins) {
            plugin.destroy();
        }

        this.booted = false;
    }

    /**
     * Unregisters a plugin from the registry.
     *
     * This does not call destroy() automatically.
     */
    public unregister(plugin: CarouselPlugin): void {
        this.plugins.delete(this.getPluginId(plugin));
    }

    /**
     * Clears all registered plugins.
     *
     * This does not call destroy() automatically.
     * The registry is reset to an unbooted state.
     */
    public clear(): void {
        this.plugins.clear();
        this.booted = false;
    }

    /**
     * Builds the unique internal identifier for a plugin.
     *
     * Format: "<name>@<version>"
     */
    private getPluginId(plugin: CarouselPlugin): string {
        return `${plugin.name}@${plugin.version}`;
    }

    /**
     * Returns true when the plugin supports the current target.
     *
     * If no kinds are declared, the plugin is treated as a production plugin.
     */
    private supportsTarget(plugin: CarouselPlugin): boolean {
        const kinds = plugin.meta?.kinds ?? ['production'];

        return kinds.includes(this.target);
    }
}