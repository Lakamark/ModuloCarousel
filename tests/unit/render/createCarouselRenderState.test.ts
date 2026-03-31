import {describe, expect, it} from "vitest";
import {createCarouselRenderState} from "../../../src/render/createCarouselRenderState";

describe('createCarouselRenderState', () => {
    it('should create normalized render state object', () => {
        const state = createCarouselRenderState(
            2,
            1,
            5,
            true,
            true
        );

        expect(state).toEqual({
            currentIndex: 2,
            previousIndex: 1,
            length: 5,
            canNext: true,
            canPrev: true,
        })
    });
});