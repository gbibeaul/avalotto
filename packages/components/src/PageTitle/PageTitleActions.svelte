<script lang="ts">
    import { spreadClassnames } from '../utils';

    export let noWrap = false;

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        class: spreadClassnames([
            'fvs-page-title-actions',
            noWrap && `fvs-page-title-actions--noWrap`,
            className,
        ]),
    };
</script>

<style>
    .fvs-page-title-actions {
        display: flex;
        margin-right: 10px;
        margin-left: 10px;
    }

    .fvs-page-title-actions > :global(.fvs-button) {
        flex-grow: 1;
    }

    .fvs-page-title-actions > :global(.fvs-button ~ .fvs-button) {
        margin-left: 5px;
    }

    @media screen and (max-width: 767px) {
        .fvs-page-title-actions:not(.fvs-page-title-actions--noWrap) {
            flex-basis: 100%;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .fvs-page-title-actions:not(.fvs-page-title-actions--noWrap)
            ~ :global(.fvs-page-title-actions:not(.fvs-page-title-actions--noWrap)) {
            margin-top: 10px;
        }
    }
</style>

<div {...props}>
    <slot />
</div>
