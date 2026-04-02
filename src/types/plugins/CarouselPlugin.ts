import type { CarouselPluginPartialDom } from "./CarouselPluginPartialDom";
import type { CarouselPluginApi } from "./CarouselPluginApi";
import type { CarouselPluginMeta } from "./CarouselPluginMeta.ts";

/**
 * Contract implemented by all carousel plugins.
 *
 * Plugins extend the carousel behavior by adding features such as controls,
 * pagination, autoplay, debugging tools, etc.
 *
 * A plugin can optionally:
 * - expose its own DOM structure
 * - declare metadata used by registries (e.g. target environments)
 *
 * The lifecycle of a plugin is managed by the {@link CarouselPluginRegistry}.
 */
export interface CarouselPlugin {
    /**
     * Unique plugin name.
     *
     * Used for identification, debugging, and conflict detection.
     * Example: "controls", "pagination", "autoplay"
     */
    readonly name: string;

    /**
     * Plugin version.
     *
     * Used for internal identification and compatibility checks.
     * Example: "1.0.0"
     */
    readonly version: string;

    /**
     * Optional human-readable description of the plugin.
     */
    readonly description?: string;

    /**
     * Optional plugin metadata.
     *
     * Used by plugin registries to determine in which environments
     * the plugin should be available (e.g. production, development, testing).
     *
     * If omitted, the plugin is treated as a production plugin.
     */
    readonly meta?: CarouselPluginMeta;

    /**
     * Optional DOM structure owned by the plugin.
     *
     * Allows the plugin to expose additional elements such as controls,
     * pagination dots, overlays, etc.
     *
     * This DOM is typically resolved and mounted by the renderer layer.
     */
    readonly dom?: CarouselPluginPartialDom;

    /**
     * Called once when the plugin is attached to the carousel.
     *
     * Provides access to the public carousel API to interact with
     * state, navigation, and events.
     */
    setup(api: CarouselPluginApi): void;

    /**
     * Called when the carousel is destroyed.
     *
     * Used to clean up event listeners, timers, and any side effects
     * created during setup.
     */
    destroy(): void;
}