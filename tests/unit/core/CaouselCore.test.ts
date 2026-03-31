import {describe, expect, it} from "vitest";
import {CarouselCore} from "../../../src/core/CarouselCore";

describe('CarouselCore', () => {
    it('initializes with index 0', () => {
        const core = new CarouselCore(4);
        expect(core.getCurrentIndex()).toBe(0);
    });

    it('returns correct length', () => {
        const core = new CarouselCore(4);
        expect(core.getLength()).toBe(4);
    });

    it('moves to next index', () => {
        const core = new CarouselCore(4);
        core.next();
        expect(core.getCurrentIndex()).toBe(1);
    });

    it('moves to previous index', () => {
        const core = new CarouselCore(4);
        core.next();
        expect(core.getCurrentIndex()).toBe(1);

        core.prev();
        expect(core.getCurrentIndex()).toBe(0)
    });
    it('does not go beyond max index', () => {
        const core = new CarouselCore(4);

        core.goTo(5);

        expect(core.getCurrentIndex()).toBe(0);
    });

    it('does not go below 0', () => {
        const core = new CarouselCore(4);

        core.goTo(-10);

        expect(core.getCurrentIndex()).toBe(0);
    });

    it('goTo sets correct index', () => {
        const core = new CarouselCore(4);

        core.goTo(2);

        expect(core.getCurrentIndex()).toBe(2);
    });

    it('goTo ignores invalid index', () => {
        const core = new CarouselCore(4);

        core.goTo(7)

        expect(core.getCurrentIndex()).toBe(0);
    });

    it('canNext works correctly', () => {
        const core = new CarouselCore(4);

        core.next();

        expect(core.canNext()).toBe(true);
    });

    it('canPrev works correctly', () => {
        const core = new CarouselCore(4);

        core.next();

        expect(core.canPrev()).toBe(true);
    });
});