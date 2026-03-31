import type {
    CarouselRendererContract,
    CarouselRenderState
} from "../types/render";

/**
 * Handles track-level rendering (layout, movement).
 */
export class CarouselTrackRenderer implements CarouselRendererContract {
    private readonly track: HTMLElement;

    public constructor(track: HTMLElement) {
        this.track = track;
    }

    public render(_state: CarouselRenderState): void {
        // TODO: future (translate, scroll, animation)
    }

    public destroy(): void {
        // cleanup if needed
    }
}