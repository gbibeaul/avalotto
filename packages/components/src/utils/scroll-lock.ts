import type { Action } from './types';

/**
 * Svelte action that blocks the body scroll
 *
 * @example
 * <div use:scrollLock />
 *
 * @param {HTMLElement} node - element
 * @returns {ReturnType<Action>} - action object
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function scrollLock(_element: HTMLElement): ReturnType<Action> {
    if (document.body.style.overflow === 'hidden') {
        return {};
    }

    const html = document.documentElement;
    const { body } = document;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
        parseInt(
            window.getComputedStyle(body).getPropertyValue('padding-right'),
            10
        ) || 0;

    const toggleScroll = (disabled: boolean): void => {
        const position = disabled ? 'relative' : '';
        const overflow = disabled ? 'hidden' : '';
        const paddingRight = disabled
            ? bodyPaddingRight + scrollBarWidth
            : bodyPaddingRight;

        /**
         * 1. Fixes a bug in iOS and desktop Safari whereby setting
         *    `overflow: hidden` on the html/body does not prevent scrolling.
         * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
         *    scroll if an `overflow-x` style is also applied to the body.
         */
        html.style.setProperty('position', position);
        body.style.setProperty('position', position);
        html.style.setProperty('overflow', overflow);
        body.style.setProperty('overflow', overflow);
        body.style.setProperty('padding-right', `${paddingRight}px`);
    };

    toggleScroll(true);

    return {
        destroy() {
            toggleScroll(false);
        },
    };
}
