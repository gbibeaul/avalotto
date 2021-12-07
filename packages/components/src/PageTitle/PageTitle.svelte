<script lang="ts">
    import { spreadClassnames } from '../utils';

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        class: spreadClassnames(['fvs-page-title', className]),
    };
</script>

<style>
    * {
        box-sizing: border-box;
    }

    .fvs-page-title {
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        min-height: 70px;

        padding: 10px;

        background-color: var(--t-color-background-page-title);
        border-bottom: 1px solid var(--t-color-border-page-title);
    }

    @media screen and (max-width: 767px) {
        .fvs-page-title {
            flex-wrap: wrap;
        }

        .fvs-page-title > :global(.fvs-page-title-icon) {
            display: none;
        }
    }
</style>

<header {...props}>
    <slot />
</header>
