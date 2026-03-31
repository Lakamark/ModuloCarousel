import type {
    CarouselDatasetMap,
    CarouselRendererContract,
    CarouselRenderState
} from "../types/render";

/**
 * Handles track-level rendering (layout, movement).
 */
export class CarouselTrackRenderer implements CarouselRendererContract {
    private readonly track: HTMLElement;
    private readonly dataset: CarouselDatasetMap;

    public constructor(track: HTMLElement, dataset: CarouselDatasetMap) {
        this.track = track;
        this.dataset = dataset;
    }

    public render(state: CarouselRenderState): void {
        this.track.dataset[this.dataset.root.index] = String(state.currentIndex);
        this.track.dataset[this.dataset.root.length] = String(state.length);
    }

    public destroy(): void {
        // cleanup if needed
    }
}