/**
 * Base DOM structure guaranteed by the carousel core.
 *
 * The core is responsible only for creating and managing this minimal
 * carousel structure. Plugins may rely on it, but should not mutate it
 * outside of their own scope.
 */
export interface CarouselDom {
    /**
     * Root carousel element.
     */
    readonly root: HTMLElement;

    /**
     * Main container wrapping all slides.
     */
    readonly container: HTMLElement;

    /**
     * Carousel slide elements.
     */
    readonly slides: readonly HTMLElement[];
}