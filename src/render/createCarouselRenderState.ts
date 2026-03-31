import type {CarouselRenderState} from "../types/render";

/**
 * Creates a normalized render state from carousel navigation data.
 */
export function createCarouselRenderState(
    currentIndex: number,
    previousIndex: number,
    length: number,
    canNext: boolean,
    canPrev: boolean
): CarouselRenderState {
    return {
        currentIndex,
        previousIndex,
        length,
        canNext,
        canPrev
    }
}