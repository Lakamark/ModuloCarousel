import type {CarouselDatasetMap} from "../types/render";

/**
 * Default dataset keys used by carousel renderers.
 */
export const carouselDatasetMap: CarouselDatasetMap = {
    root: {
        index: 'index',
        length: 'length',
    },
    slides: {
        index: 'index',
        active: 'active',
    },
} as const;