import {describe, it, expect, vi} from "vitest";
import type {CarouselRendererContract} from "../../src/types/render";
import {ModuloCarousel} from "../../src/ModuloCarousel.ts";

describe('ModuloCarousel', () => {
    function createSlides(count: number): HTMLElement[] {
        return Array.from({ length: count }, () => document.createElement('div'));
    }

    function createRenderer(): CarouselRendererContract {
        return {
            render: vi.fn(),
            destroy: vi.fn(),
        };
    }

    it('should boot and render the initial state', () => {
        const element = document.createElement('div');
        const slides = createSlides(3);
        const renderer = createRenderer();

        const carousel = new ModuloCarousel(element, slides, renderer);

        carousel.boot();

        expect(renderer.render).toHaveBeenCalledTimes(1);
        expect(carousel.currentIndex).toBe(0);
    });

    it('should move to the next slide', () => {
        const element = document.createElement('div');
        const slides = createSlides(3);
        const renderer = createRenderer();

        const carousel = new ModuloCarousel(element, slides, renderer);

        carousel.boot();
        carousel.next();

        expect(carousel.currentIndex).toBe(1);
    });

    it('should move to the previously slide', () => {
        const element = document.createElement('div');
        const slides = createSlides(3);
        const renderer = createRenderer();

        const carousel = new ModuloCarousel(element, slides, renderer);

        carousel.boot();
        carousel.next();
        carousel.prev();

        expect(carousel.currentIndex).toBe(0);
    });

    it('should move to a specific index with goTo', () => {
        const element = document.createElement('div');
        const slides = createSlides(4);
        const renderer = createRenderer();

        const carousel = new ModuloCarousel(element, slides, renderer);

        carousel.boot();
        carousel.goTo(2);

        expect(carousel.currentIndex).toBe(2)
    });

    it('does not move when beforeChange event was canceled', () => {
        const element = document.createElement('div');
        const slides = createSlides(3);
        const renderer = createRenderer();

        const carousel = new ModuloCarousel(element, slides, renderer);

        carousel.on('beforeChange', (event) =>  {
            event.cancel = true;
        });

        carousel.boot();
        carousel.next();

        expect(carousel.currentIndex).toBe(0);
    });

    it('should emit change after navigation', () => {
        const element = document.createElement('div');
        const slides = createSlides(3);
        const renderer = createRenderer();
        const listener = vi.fn();

        const carousel = new ModuloCarousel(element, slides, renderer);

        carousel.on('change', listener);

        carousel.boot();
        carousel.next();

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({
            previousIndex: 0,
            currentIndex: 1,
            length: 3,
        });
    });

    it('should delegate destroy to the renderer', () => {
        const element = document.createElement('div');
        const slides = createSlides(3);
        const renderer = createRenderer();

        const carousel = new ModuloCarousel(element, slides, renderer);

        carousel.destroy();

        expect(renderer.destroy).toHaveBeenCalledTimes(1);
    });
});