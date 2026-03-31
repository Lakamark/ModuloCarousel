import type {CarouselRenderState} from "./CarouselRenderState.ts";

/**
 * Contract implemented by all carousel renderers.
 */
export interface CarouselRendererContract {
    render(state: CarouselRenderState): void;
    destroy(): void;
}