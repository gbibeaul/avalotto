import type { Action } from './types';

/**
 *  Svelte action that allows you to do something when clicking outside a certain element.
 *  Useful for closing menus/dropdowns/modals.
 * @example
 *  <script>
 *  import { clickOutside } from './utils'
 *  let isOpen = false;
 *  function handleClickOutside() {
 *      isOpen = false;
 *  }
 *   </script>
 *   <div use:clickOutside={handleClickOutside} >
 * @param node The html node on which the action will be binded
 * @param onEventFunction a call back to be executed when the outside click is registered
 * @returns a destroy function to call when the component is unmounted
 */
export default function clickOutside(
    node: HTMLElement,
    onEventFunction: () => void
): ReturnType<Action> {
    // Get the path of the DOM starting from the target all the way to Window
    const handleClick = (event: Event) => {
        const path = event.composedPath();

        if (!path.includes(node)) {
            onEventFunction();
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        },
    };
}
