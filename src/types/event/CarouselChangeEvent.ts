/**
 * Payload emitted after the active slide has changed.
 */
export interface CarouselChangeEvent {
    /**
     * Previously active slide index.
     */
    previousIndex: number;

    /**
     * Newly active slide index.
     */
    currentIndex: number;

    /**
     * Total number of slides.
     */
    length: number;
}