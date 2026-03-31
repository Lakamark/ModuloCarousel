import type {CarouselEventListener} from "../types/event";

/**
 * Generic event bus used to register and emit typed events.
 */
export class EventBus<TEventMap extends object> {
    /**
     * Internal listener registry grouped by event name.
     */
    private listeners: {
        [K in keyof TEventMap]?: CarouselEventListener<TEventMap[K]>[];
    } = {};

    /**
     * Registers a listener for an event.
     */
    public on<K extends keyof TEventMap>(
        event: K,
        listener: CarouselEventListener<TEventMap[K]>
    ): void {
        const listeners = this.listeners[event] ?? [];
        listeners.push(listener);
        this.listeners[event] = listeners;
    }

    /**
     * Removes a previously registered listener.
     */
    public off<K extends keyof TEventMap>(
        event: K,
        listener: CarouselEventListener<TEventMap[K]>
    ): void {
        const listeners = this.listeners[event];

        if (!listeners) {
            return;
        }

        this.listeners[event] = listeners.filter(
            (registeredListener) => registeredListener !== listener
        );
    }

    /**
     * Emits an event with the provided payload.
     *
     * Returns false when the payload has been canceled.
     */
    public emit<K extends keyof TEventMap>(
        event: K,
        payload: TEventMap[K]
    ): boolean {
        const listeners = this.listeners[event];

        if (!listeners || listeners.length === 0) {
            return true;
        }

        for (const listener of listeners) {
            listener(payload);

            if (this.isCanceled(payload)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Returns true when the payload has been canceled.
     */
    private isCanceled(payload: TEventMap[keyof TEventMap]): boolean {
        return (
            typeof payload === 'object' &&
            payload !== null &&
            'cancel' in payload &&
            payload.cancel === true
        );
    }
}