import { describe, expect, it, vi } from 'vitest';
import type {
    CarouselDom,
    CarouselPlugin,
    CarouselPluginApi,
} from '../../../src/types/plugins';
import { CarouselPluginRegistry } from '../../../src/types/plugins/CarouselPluginRegistry';
import type { CarouselPluginKind } from '../../../src/types/plugins/CarouselPluginMeta';

describe('CarouselPluginRegistry', () => {
    function createDom(): CarouselDom {
        return {
            root: document.createElement('div'),
            container: document.createElement('div'),
            slides: [document.createElement('div'), document.createElement('div')],
        };
    }

    function createApi(): CarouselPluginApi {
        const dom = createDom();

        return {
            element: dom.root,
            slides: dom.slides,
            length: dom.slides.length,
            currentIndex: 0,
            dom,
            goTo: vi.fn(),
            prev: vi.fn(),
            next: vi.fn(),
            on: vi.fn(),
            off: vi.fn(),
        };
    }

    function createRegistry(target: CarouselPluginKind = 'production'): CarouselPluginRegistry {
        return new CarouselPluginRegistry([], target);
    }

    function createPlugin(
        name: string,
        kinds?: readonly CarouselPluginKind[],
        version = '1.0.0',
    ): CarouselPlugin {
        return {
            name,
            version,
            setup: vi.fn(),
            destroy: vi.fn(),
            meta: kinds ? { kinds } : undefined,
        };
    }

    describe('register()', () => {
        it('registers plugin when target matches', () => {
            const registry = createRegistry('development');
            const plugin = createPlugin('debug', ['development']);

            registry.register(plugin);

            expect(registry.getAll()).toEqual([plugin]);
        });

        it('ignores plugin when target does not match', () => {
            const registry = createRegistry('production');
            const plugin = createPlugin('debug', ['development']);

            registry.register(plugin);

            expect(registry.getAll()).toEqual([]);
        });

        it('treats plugin without meta as production', () => {
            const registry = createRegistry('production');
            const plugin = createPlugin('controls');

            registry.register(plugin);

            expect(registry.getAll()).toEqual([plugin]);
        });

        it('does not register plugin without meta in development', () => {
            const registry = createRegistry('development');
            const plugin = createPlugin('controls');

            registry.register(plugin);

            expect(registry.getAll()).toEqual([]);
        });

        it('registers plugin if one kind matches', () => {
            const registry = createRegistry('development');
            const plugin = createPlugin('logger', ['production', 'development']);

            registry.register(plugin);

            expect(registry.getAll()).toEqual([plugin]);
        });

        it('returns true when plugin is registered', () => {
            const registry = createRegistry();
            const plugin = createPlugin('controls');

            registry.register(plugin);

            expect(registry.has(plugin)).toBe(true);
        });

        it('throws when registering duplicate plugin id', () => {
            const registry = createRegistry();
            const first = createPlugin('controls');
            const second = createPlugin('controls');

            registry.register(first);

            expect(() => registry.register(second)).toThrow(
                'Plugin "controls@1.0.0" is already registered.',
            );
        });

        it('allows plugins with the same name but different versions', () => {
            const registry = createRegistry();
            const first = createPlugin('controls', undefined, '1.0.0');
            const second = createPlugin('controls', undefined, '2.0.0');

            registry.register(first);
            registry.register(second);

            expect(registry.getAll()).toEqual([first, second]);
        });

        it('does not throw conflict when filtered plugin shares same id', () => {
            const registry = createRegistry('production');
            const devPlugin = createPlugin('controls', ['development']);
            const prodPlugin = createPlugin('controls', ['production']);

            registry.register(devPlugin);
            registry.register(prodPlugin);

            expect(registry.getAll()).toEqual([prodPlugin]);
        });
    });

    describe('boot()', () => {
        it('boots plugins in registration order', () => {
            const registry = createRegistry();
            const api = createApi();
            const calls: string[] = [];

            const first: CarouselPlugin = {
                ...createPlugin('first'),
                setup: () => calls.push('first:setup'),
            };

            const second: CarouselPlugin = {
                ...createPlugin('second'),
                setup: () => calls.push('second:setup'),
            };

            registry.register(first);
            registry.register(second);

            registry.boot(api);

            expect(calls).toEqual(['first:setup', 'second:setup']);
        });

        it('does not boot plugins twice', () => {
            const registry = createRegistry();
            const api = createApi();
            const plugin = createPlugin('controls');

            registry.register(plugin);

            registry.boot(api);
            registry.boot(api);

            expect(plugin.setup).toHaveBeenCalledTimes(1);
        });

        it('boots only plugins matching target', () => {
            const registry = createRegistry('production');
            const api = createApi();
            const prodPlugin = createPlugin('controls', ['production']);
            const devPlugin = createPlugin('debug', ['development']);

            registry.register(prodPlugin);
            registry.register(devPlugin);

            registry.boot(api);

            expect(prodPlugin.setup).toHaveBeenCalledTimes(1);
            expect(devPlugin.setup).not.toHaveBeenCalled();
        });
    });

    describe('destroy()', () => {
        it('destroys plugins in reverse registration order', () => {
            const registry = createRegistry();
            const calls: string[] = [];

            const first: CarouselPlugin = {
                ...createPlugin('first'),
                destroy: () => calls.push('first:destroy'),
            };

            const second: CarouselPlugin = {
                ...createPlugin('second'),
                destroy: () => calls.push('second:destroy'),
            };

            registry.register(first);
            registry.register(second);

            registry.destroy();

            expect(calls).toEqual(['second:destroy', 'first:destroy']);
        });
    });

    describe('unregister()', () => {
        it('unregisters a plugin', () => {
            const registry = createRegistry();
            const plugin = createPlugin('controls');

            registry.register(plugin);
            registry.unregister(plugin);

            expect(registry.getAll()).toEqual([]);
        });
    });

    describe('clear()', () => {
        it('clears all registered plugins', () => {
            const registry = createRegistry();

            registry.register(createPlugin('controls'));
            registry.register(createPlugin('pagination'));

            registry.clear();

            expect(registry.getAll()).toEqual([]);
        });
    });

    describe('has()', () => {
        it('returns true when plugin is registered', () => {
            const registry = createRegistry();
            const plugin = createPlugin('controls');

            registry.register(plugin);

            expect(registry.has(plugin)).toBe(true);
        });

        it('returns false when plugin is not registered', () => {
            const registry = createRegistry();
            const plugin = createPlugin('controls');

            expect(registry.has(plugin)).toBe(false);
        });

        it('returns false for plugin filtered by target', () => {
            const registry = createRegistry('production');
            const plugin = createPlugin('debug', ['development']);

            registry.register(plugin);

            expect(registry.has(plugin)).toBe(false);
        });
    });

    describe('lifecycle', () => {
        it('allows booting again after destroy', () => {
            const registry = createRegistry();
            const api = createApi();
            const plugin = createPlugin('controls');

            registry.register(plugin);

            registry.boot(api);
            registry.destroy();
            registry.boot(api);

            expect(plugin.setup).toHaveBeenCalledTimes(2);
            expect(plugin.destroy).toHaveBeenCalledTimes(1);
        });
    });
});