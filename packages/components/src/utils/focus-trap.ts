import type { Action } from './types';

interface HTMLFocusableElement extends HTMLElement {
    tabIndex: number;
    blur(): void;
    focus(options?: FocusOptions): void;
}

/**
 * Svelte action that traps focus within a DOM node.
 * Listens for a "Tab" or "Shift + Tab" key press to change the focus.
 * Container should have at least on focusable element:
 * "a", "button", "input", "textarea", "select", "details", [tabindex]
 * Disabled or [tabindex="-1"] elements will be ignored.
 *
 * @example
 * <!-- container element must have attribute [tabindex="-1"] -->
 * <div tabindex="-1" use:focusTrap>
 *  <!-- Focusable elements -->
 * </div>
 *
 * @param {HTMLElement} node - container element
 * @returns {ReturnType<Action>} - action object
 */
export default function focusTrap(
    element: HTMLFocusableElement
): ReturnType<Action> {
    // set focus when element is created
    element.focus();

    // get all the elements inside
    const elements = [
        ...element.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]'
        ),
    ] as HTMLFocusableElement[];

    // filter disabled or tab-hidden ones
    const focusableElements = elements.filter(
        (el) => !(el.hasAttribute('disabled') || el.tabIndex === -1)
    );

    function keydown(event: KeyboardEvent): void {
        if (event.key === 'Tab' || event.keyCode === 9) {
            const currentElementIndex = focusableElements.indexOf(
                document.activeElement as HTMLElement
            );

            event.preventDefault();

            if (event.shiftKey) {
                // shift + tab
                // if at the start, go to end
                if (currentElementIndex === 0) {
                    focusableElements[focusableElements.length - 1].focus();
                } else {
                    focusableElements[currentElementIndex - 1].focus();
                }
                // just tab
                // if at the end, go to start
            } else if (currentElementIndex === focusableElements.length - 1) {
                focusableElements[0].focus();
            } else {
                focusableElements[currentElementIndex + 1].focus();
            }
        }
    }

    element.addEventListener('keydown', keydown);

    return {
        destroy() {
            element.removeEventListener('keydown', keydown);
        },
    };
}
