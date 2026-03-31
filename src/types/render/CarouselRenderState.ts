/**
 * Normalized state used by renderers to update the carousel DOM.
 */
export interface CarouselRenderState {
    /**
     * Currently active slide index.
     */
    currentIndex: number;

    /**
     * Previously active slide index.
     */
    previousIndex: number;

    /**
     * Total number of slides.
     */
    length: number;

    /**
     * Whether moving to the next slide is possible.
     */
    canNext: boolean;

    /**
     * Whether moving to the previous slide is possible.
     */
    canPrev: boolean;
}