export type Action = (
    node: HTMLElement,
    parameters?: unknown
) => {
    update?: (parameters: unknown) => void;
    destroy?: () => void;
};
