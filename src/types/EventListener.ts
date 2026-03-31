/**
 * Function executed when an event is emitted.
 */
export type EventListener<TPayload> = (payload: TPayload) => void;