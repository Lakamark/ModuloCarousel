import type {
    CarouselRendererContract,
    CarouselRenderState
} from "../types/render";

/**
 * Orchestrates all renderers.
 */
export class CarouselRenderer implements CarouselRendererContract {
    private readonly renderers: CarouselRendererContract[];

    public constructor(renderers: CarouselRendererContract[]) {
        this.renderers = renderers;
    }

    public render(state: CarouselRenderState): void {
        for (const renderer of this.renderers) {
            renderer.render(state);
        }
    }

    public destroy(): void {
        for (const renderer of this.renderers) {
            renderer.destroy();
        }
    }
}