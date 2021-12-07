<script lang="ts">
    import { spreadClassnames } from '../utils';

    $: props = {
        ...$$restProps,
        class: spreadClassnames(['fvs-dialog-skrim', $$restProps.class]),
    };
</script>

<style>
    .fvs-dialog-skrim {
        position: fixed;
        top: 0;
        left: 0;

        z-index: -1;

        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        background-color: rgba(22, 22, 22, 0.25);
    }
</style>

<div {...props} />
