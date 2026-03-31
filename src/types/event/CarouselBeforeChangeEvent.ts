/**
 * Payload emitted before the carousel changes slide.
 */
export interface CarouselBeforeChangeEvent {
    /**
     * Previously active slide index.
     */
    previousIndex: number;

    /**
     * Target slide index.
     */
    currentIndex: number;

    /**
     * Total number of slides.
     */
    length: number;

    /**
     * Cancels the pending slide change when set to true.
     */
    cancel?: boolean;
}