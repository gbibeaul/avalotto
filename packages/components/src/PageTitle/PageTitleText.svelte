<script lang="ts">
    import { spreadClassnames } from '../utils';

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        class: spreadClassnames(['fvs-page-title-text', className]),
    };
</script>

<style>
    .fvs-page-title-text {
        flex: 1 0 0%;
        margin-right: 10px;
        margin-left: 10px;
        overflow: hidden;
    }

    .fvs-page-title-text-main {
        margin: 0;
    }

    .fvs-page-title-text-subtitle {
        margin: 0;
    }

    .truncate {
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>

<div {...props}>
    <h3 class="fvs-page-title-text-main truncate">
        <slot />
    </h3>
    <div class="fvs-page-title-text-subtitle truncate">
        <slot name="subtitle" />
    </div>
</div>
