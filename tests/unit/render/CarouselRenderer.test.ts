import {describe, it, vi, expect} from "vitest";
import type {
    CarouselRendererContract,
    CarouselRenderState
} from "../../../src/types/render";
import {CarouselRenderer} from "../../../src/render/CarouselRenderer";

describe('CarouselRenderer', () => {
    it('should call all renderer on all child renderers', () => {
        const firstRenderer: CarouselRendererContract = {
            render: vi.fn(),
            destroy: vi.fn()
        };

        const secondRenderer: CarouselRendererContract = {
            render: vi.fn(),
            destroy: vi.fn()
        };

        const renderer = new CarouselRenderer([firstRenderer, secondRenderer]);

        const state: CarouselRenderState = {
            currentIndex: 1,
            previousIndex: 0,
            length: 3,
            canNext: true,
            canPrev: true,
        };

        renderer.render(state);

        expect(firstRenderer.render).toHaveBeenCalledTimes(1);
        expect(firstRenderer.render).toHaveBeenCalledWith(state);

        expect(secondRenderer.render).toHaveBeenCalledTimes(1);
        expect(secondRenderer.render).toHaveBeenCalledWith(state);
    });

    it('should call destroy on all child renderers', () => {
        const firstRenderer: CarouselRendererContract = {
            render: vi.fn(),
            destroy: vi.fn(),
        };

        const secondRenderer: CarouselRendererContract = {
            render: vi.fn(),
            destroy: vi.fn(),
        };

        const renderer = new CarouselRenderer([firstRenderer, secondRenderer,]);

        renderer.destroy();

        expect(firstRenderer.destroy).toHaveBeenCalledTimes(1);
        expect(secondRenderer.destroy).toHaveBeenCalledTimes(1);
    });
});