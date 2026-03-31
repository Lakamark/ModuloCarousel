import type {
    CarouselEventListener,
    CarouselEventMap
} from "./event";

export interface ModuloCarouselApi {
    readonly element: HTMLElement;
    readonly slides: readonly HTMLElement[];
    readonly length: number;
    readonly currentIndex: number;

    boot(): void;
    destroy(): void;
    goTo(index: number): void;
    prev(): void;
    next(): void;

    on<K extends keyof CarouselEventMap>(
        event: K,
        listener: CarouselEventListener<CarouselEventMap[K]>
    ): void;

    off<K extends keyof CarouselEventMap>(
        event: K,
        listener: CarouselEventListener<CarouselEventMap[K]>
    ): void;
}