import {describe, it, expect} from "vitest";
import {carouselDatasetMap} from "../../../src/render/carouselDatasetMap";
import {CarouselSlideRenderer} from "../../../src/render/CarouselSlideRenderer";
import type {CarouselRenderState} from "../../../src/types/render";

describe('CarouselSlideRenderer', () => {
    it('should applies the slide index dataset to each slide', () => {
        const slides = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
        ];

        const renderer = new CarouselSlideRenderer(slides, carouselDatasetMap);

        const state: CarouselRenderState = {
            currentIndex: 1,
            previousIndex: 0,
            length: 3,
            canNext: true,
            canPrev: true,
        }

        renderer.render(state);

        expect(slides[0].dataset.active).toBe('false');
        expect(slides[1].dataset.active).toBe('true');
        expect(slides[2].dataset.active).toBe('false');
    });

    it('should update active dataset when the current index changes', () => {
        const slides = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
        ];

        const renderer = new CarouselSlideRenderer(slides, carouselDatasetMap);

        const firstState: CarouselRenderState = {
            currentIndex: 0,
            previousIndex: 0,
            length: 3,
            canNext: true,
            canPrev: false,
        };

        const secondState: CarouselRenderState = {
            currentIndex: 2,
            previousIndex: 0,
            length: 3,
            canNext: false,
            canPrev: true,
        };

        renderer.render(firstState);
        renderer.render(secondState);

        expect(slides[0].dataset.active).toBe('false');
        expect(slides[1].dataset.active).toBe('false');
        expect(slides[2].dataset.active).toBe('true');
    });
});