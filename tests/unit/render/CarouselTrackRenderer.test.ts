import {describe, it, expect} from "vitest";
import {CarouselTrackRenderer} from "../../../src/render/CarouselTrackRenderer";
import type {CarouselRenderState} from "../../../src/types/render";
import {carouselDatasetMap} from "../../../src/render/carouselDatasetMap.ts";

describe('CarouselTrackRenderer', () => {
    it('should applies the current index and length dataset to the track', () => {
        const track = document.createElement('div');
        const renderer = new CarouselTrackRenderer(track, carouselDatasetMap);

        const state: CarouselRenderState = {
            currentIndex: 2,
            previousIndex: 1,
            length: 5,
            canNext: true,
            canPrev: true,
        };

        renderer.render(state);

        expect(track.dataset.index).toBe('2');
        expect(track.dataset.length).toBe('5');

    });
});