import type {CarouselDom} from "./CarouselDoom";
import type {
    CarouselEventListener,
    CarouselEventMap
} from "../event";

/**
 * API exposed to carousel plugins.
 *
 * This API is intentionally limited so plugins can extend the carousel
 * without depending on internal implementation details.
 */
export interface CarouselPluginApi {
    /**
     * Root carousel element.
     */
    readonly element: HTMLElement;

    /**
     * Carousel slide elements.
     */
    readonly slides: readonly HTMLElement[];

    /**
     * Total number of slides.
     */
    readonly length: number;

    /**
     * Current active slide index.
     */
    readonly currentIndex: number;

    /**
     * Base DOM structure managed by the carousel core.
     */
    readonly dom: CarouselDom;

    /**
     * Moves to a specific slide index.
     */
    goTo(index: number): void;

    /**
     * Moves to the previous slide.
     */
    prev(): void;

    /**
     * Moves to the next slide.
     */
    next(): void;

    /**
     * Registers a carousel event listener.
     */
    on<K extends keyof CarouselEventMap>(
        event: K,
        listener: CarouselEventListener<CarouselEventMap[K]>
    ): void;

    /**
     * Removes a carousel event listener.
     */
    off<K extends keyof CarouselEventMap>(
        event: K,
        listener: CarouselEventListener<CarouselEventMap[K]>
    ): void;
}