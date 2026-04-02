/**
 * Optional DOM structure expose by a plugin.
 *
 * Plugins may define additional DOOM Elements
 * they manage without requiring any change in the carousel core.
 *
 * The structure stays flexible so plugin authors can extend the carousel
 * with their own markup while keeping the core independent.
 */
export interface CarouselPluginPartialDom {
    /**
     * Optional root element.
     */
    readonly root?: HTMLElement | null;

    /**
     * Optional collection of elements managed by the plugin.
     */
    readonly elements?: HTMLElement[];

    /**
     * Additional plugin-specific DOM entries.
     */
    readonly [key: string]:
        | HTMLElement
        | readonly HTMLElement[]
        | null
        | undefined;
}