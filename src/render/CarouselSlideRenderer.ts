import type {
    CarouselDatasetMap,
    CarouselRendererContract,
    CarouselRenderState
} from "../types/render";

/**
 * Handles slide-level rendering (dataset, active state).
 */
export class CarouselSlideRenderer implements CarouselRendererContract {
    private readonly slides: readonly HTMLElement[];
    private readonly dataset: CarouselDatasetMap;

    public constructor(
        slides: readonly HTMLElement[],
        dataset: CarouselDatasetMap
    ) {
        this.slides = slides;
        this.dataset = dataset;
    }

    public render(state: CarouselRenderState): void {
        this.slides.forEach((slide, index) => {
            slide.dataset[this.dataset.slides.index] = String(index);

            const isActive = index === state.currentIndex;

            slide.dataset[this.dataset.slides.active] = String(isActive);
        });
    }

    public destroy(): void {
        // optional cleanup
    }
}