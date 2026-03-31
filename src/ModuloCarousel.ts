import { CarouselCore } from './core/CarouselCore';
import { EventBus } from './core/EventBus';
import { createCarouselRenderState } from './render/createCarouselRenderState';
import type { ModuloCarouselApi } from './types/ModuloCarouselApi';
import type { CarouselRendererContract } from './types/render';
import type {
    CarouselEventListener,
    CarouselEventMap,
} from './types/event';

export class ModuloCarousel implements ModuloCarouselApi {
    public readonly element: HTMLElement;
    public readonly slides: readonly HTMLElement[];

    private readonly core: CarouselCore;
    private readonly events: EventBus<CarouselEventMap>;
    private readonly renderer: CarouselRendererContract;
    private booted = false;

    public constructor(
        element: HTMLElement,
        slides: readonly HTMLElement[],
        renderer: CarouselRendererContract
    ) {
        this.element = element;
        this.slides = slides;
        this.renderer = renderer;

        this.core = new CarouselCore(slides.length);
        this.events = new EventBus<CarouselEventMap>();
    }

    public get length(): number {
        return this.core.getLength();
    }

    public get currentIndex(): number {
        return this.core.getCurrentIndex();
    }

    public boot(): void {
        if (this.booted) {
            return;
        }

        this.booted = true;
        this.render(this.currentIndex);
    }

    public destroy(): void {
        this.renderer.destroy();
    }

    public goTo(index: number): void {
        const previousIndex = this.currentIndex;

        if (index === previousIndex) {
            return;
        }

        if (index < 0 || index >= this.length) {
            return;
        }

        const allowed = this.events.emit('beforeChange', {
            previousIndex,
            currentIndex: index,
            length: this.length
        });

        // If the event was canceled.
        if (!allowed) {
            return;
        }

        this.core.goTo(index);
        this.render(previousIndex);

        this.events.emit('change', {
            previousIndex,
            currentIndex: this.currentIndex,
            length: this.length,
        });
    }

    public prev(): void {
        if (!this.core.canPrev()) {
            return;
        }

        this.goTo(this.currentIndex - 1);
    }

    public next(): void {
        if (!this.core.canNext()) {
            return;
        }

        this.goTo(this.currentIndex + 1);
    }

    private render(previousIndex: number): void {
        const state = createCarouselRenderState(
            this.currentIndex,
            previousIndex,
            this.length,
            this.core.canNext(),
            this.core.canPrev()
        );

        this.renderer.render(state);
    }

    public on<K extends keyof CarouselEventMap>(
        event: K,
        listener: CarouselEventListener<CarouselEventMap[K]>
    ): void {
        this.events.on(event, listener);
    }

    public off<K extends keyof CarouselEventMap>(
        event: K,
        listener: CarouselEventListener<CarouselEventMap[K]>
    ): void {
        this.events.on(event, listener);
    }
}