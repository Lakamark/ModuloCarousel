/**
 * Dataset keys used by carousel renderers.
 */
export interface CarouselDatasetMap {
    /**
     * Dataset keys applied to the carousel root element.
     */
    readonly root: {
        /**
         * Dataset key used to expose the current active index.
         */
        readonly index: string;

        /**
         * Dataset key used to expose the total number of slides.
         */
        readonly length: string;
    };

    /**
     * Dataset keys applied to each slide element.
     */
    readonly slides: {
        /**
         * Dataset key used to expose the slide index.
         */
        readonly index: string;

        /**
         * Dataset key used to expose the active state.
         */
        readonly active: string;
    };
}