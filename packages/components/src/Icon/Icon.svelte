<script>
    /**
     *
     * Material Design Icons
     *
     * We are using the Sharp Icons.
     * Icon list - https://fonts.google.com/icons?selected=Material+Icons+Sharp
     * Developer docs - https://google.github.io/material-design-icons/
     * Repository - https://github.com/google/material-design-icons
     * Design - https://material.io/design/iconography/system-icons.html
     *
     * CSS is taken from:
     * <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
      rel="stylesheet">
     *
     */
    import { spreadClassnames } from '../utils';

    /**
     * Specify the size of the Icon
     * @type {'primary' | 'secondary' | 'tertiary'}
     */
    export let size = 'primary';

    /**
     * Specify the color of the Icon - can be set to any Terroir color token
     */
    export let color = '--t-color-text-icon';

    $: cssVarStyles = `--icon-color:var(${color});`;

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'mdis',
            size !== 'primary' && `mdis--${size}`,
            $$restProps.class,
        ]),
        style: cssVarStyles,
    };
</script>

<style>
    .mdis {
        display: inline-block;

        color: var(--icon-color);

        font-weight: normal;
        font-size: var(--t-font-icon-size-primary);
        font-family: 'Material Icons Sharp';
        font-style: normal;
        line-height: 1;
        direction: ltr;
        letter-spacing: normal;
        white-space: nowrap;
        text-transform: none;
        vertical-align: middle;
        word-wrap: normal;
        font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
    }

    .mdis--secondary {
        font-size: var(--t-font-icon-size-secondary);
    }
    .mdis--tertiary {
        font-size: var(--t-font-icon-size-tertiary);
    }
</style>

<i {...props} aria-hidden="true" data-testid="material-icon" on:hover on:click>
    <slot />
</i>
