import {describe, it, expect, vi} from "vitest";
import type {CarouselEventMap} from "../../../src/types/event";
import {EventBus} from "../../../src/core/EventBus.ts";

describe('EventBus', () => {
    it('registers a listener and calls it when the event is emitted', () => {
        const events = new EventBus<CarouselEventMap>();
        const listener = vi.fn();

        events.on('change', listener);

        events.emit('change', {
            previousIndex: 0,
            currentIndex: 1,
            length: 3,
        });

        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('passes the payload to the listener', () => {
        const events = new EventBus<CarouselEventMap>();
        const listener = vi.fn();

        const payload = {
            previousIndex: 0,
            currentIndex: 1,
            length: 3,
        };

        events.on('change', listener);
        events.emit('change', payload);

        expect(listener).toHaveBeenCalledWith(payload);
    });

    it('calls all listeners registered for the same event', () => {
        const events = new EventBus<CarouselEventMap>();
        const firstListener = vi.fn();
        const secondListener = vi.fn();

        events.on('change', firstListener);
        events.on('change', secondListener);

        events.emit('change', {
            previousIndex: 0,
            currentIndex: 1,
            length: 3,
        });

        expect(firstListener).toHaveBeenCalledTimes(1);
        expect(secondListener).toHaveBeenCalledTimes(1);
    });

    it('removes a listener with off', () => {
        const events = new EventBus<CarouselEventMap>();
        const listener = vi.fn();

        events.on('change', listener);
        events.off('change', listener);

        events.emit('change', {
            previousIndex: 0,
            currentIndex: 1,
            length: 3,
        });

        expect(listener).not.toHaveBeenCalled();
    });

    it('returns true when the event is not canceled', () => {
        const events = new EventBus<CarouselEventMap>();

        const result = events.emit('beforeChange', {
            previousIndex: 0,
            currentIndex: 1,
            length: 3,
        });

        expect(result).toBe(true);
    });

    it('returns false when the event payload is canceled', () => {
        const events = new EventBus<CarouselEventMap>();

        events.on('beforeChange', (event) => {
            event.cancel = true;
        });

        const result = events.emit('beforeChange', {
            previousIndex: 0,
            currentIndex: 1,
            length: 3,
        });

        expect(result).toBe(false);
    });

    it('stops calling listeners after cancellation', () => {
        const events = new EventBus<CarouselEventMap>();
        const secondListener = vi.fn();

        events.on('beforeChange', (event) => {
            event.cancel = true;
        });

        events.on('beforeChange', secondListener);

        const result = events.emit('beforeChange', {
            previousIndex: 0,
            currentIndex: 1,
            length: 3,
        });

        expect(result).toBe(false);
        expect(secondListener).not.toHaveBeenCalled();
    });
});