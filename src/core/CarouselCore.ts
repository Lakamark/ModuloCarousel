/**
 * Core logic of the carousel.
 *
 * Handles index navigation and boundaries.
 */
export class CarouselCore {
    private currentIndex = 0;
    private readonly length: number;

    public constructor(length: number) {
        // If the length is a negative number or 0
        if (length <= 0) {
            throw new Error('Carousel length must be greater than 0');
        }

        this.length = length;
    }

    /**
     * Return the total number of slides.
     */
    public getLength(): number {
        return this.length;
    }

    /**
     * Returns the current active index.
     */
    public getCurrentIndex(): number {
        return this.currentIndex;
    }

    /**
     * Moves to a specific index.
     */
    public goTo(index: number): void {
        if (index < 0 || index >= this.length) {
            return;
        }

        this.currentIndex = index;
    }

    /**
     * Moves to the next slide if possible.
     */
    public next(): void {
        if (!this.canNext()) {
            return;
        }

        this.currentIndex += 1;
    }

    /**
     * Moves to the previous slide if possible.
     */
    public prev(): void {
        if (!this.canPrev()) {
            return;
        }

        this.currentIndex -= 1;
    }

    /**
     * Returns true if moving forward is possible.
     */
    public canNext(): boolean {
        return this.currentIndex < this.length -1;
    }

    /**
     * Returns true if moving backward is possible.
     */
    public canPrev(): boolean {
        return this.currentIndex > 0;
    }
}