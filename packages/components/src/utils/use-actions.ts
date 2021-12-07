export type UseAction = {
    update?: (
        actions?: Array<UseAction | [UseAction, unknown] | unknown>
    ) => void;
    destroy?: () => void;
};

export type UseActionFn = (
    node: HTMLElement,
    ...params: unknown[]
) => UseAction;

export type UseActionWithParams = [UseActionFn, unknown];

export type UseActions = Array<UseActionFn | UseActionWithParams>;

/**
 * Svelte action helps passing action to Svele component
 * @example
 *
 * Passing params to component:
 *
 * <SomeComponent use={[Action1, [Action2, action2Props], Action3]}></SomeComponent>
 *
 * Inside SomeComponent.svelte:
 *
 * <script>
 *  export let use = [];
 * </script>
 *
 * <div use:useActions={use}></div>
 *
 * @param node
 * @param actions
 * @returns
 */
export default function useActions(
    node: HTMLElement,
    actions: UseActions
): UseAction {
    const objects: UseAction[] = [];

    if (actions) {
        for (let i = 0; i < actions.length; i += 1) {
            const isArray = Array.isArray(actions[i]);
            const action: UseActionFn = (
                isArray ? (actions[i] as UseActionWithParams)[0] : actions[i]
            ) as UseActionFn;
            if (isArray && (actions[i] as UseActionWithParams).length > 1) {
                objects.push(
                    action(node, (actions[i] as UseActionWithParams)[1])
                );
            } else {
                objects.push(action(node));
            }
        }
    }

    return {
        update(data) {
            if (((data && data.length) || 0) !== objects.length) {
                throw new Error(
                    'You must not change the length of an actions array.'
                );
            }

            if (data) {
                for (let i = 0; i < data.length; i += 1) {
                    if (objects[i] && 'update' in objects[i]) {
                        const isArray = Array.isArray(data[i]);
                        if (
                            isArray &&
                            (data[i] as UseActionWithParams).length > 1
                        ) {
                            objects[i].update(
                                (data[i] as UseActionWithParams)[1] as unknown[]
                            );
                        } else {
                            objects[i].update();
                        }
                    }
                }
            }
        },

        destroy() {
            for (let i = 0; i < objects.length; i += 1) {
                if (objects[i] && 'destroy' in objects[i]) {
                    objects[i].destroy();
                }
            }
        },
    };
}
