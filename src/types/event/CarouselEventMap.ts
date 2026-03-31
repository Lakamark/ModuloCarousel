import type {CarouselBeforeChangeEvent} from "./CarouselBeforeChangeEvent";
import type {CarouselChangeEvent} from "./CarouselChangeEvent";

/**
 * Map of carousel event names to their payload types.
 */
export interface CarouselEventMap {
    /**
     * Emitted before a slide change is applied.
     */
    beforeChange: CarouselBeforeChangeEvent;

    /**
     * Emitted after a slide change is applied.
     */
    change: CarouselChangeEvent;
}