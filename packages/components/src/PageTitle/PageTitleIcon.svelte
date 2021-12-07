<script lang="ts">
    import Icon from '../Icon/Icon.svelte';
    import { spreadClassnames } from '../utils';

    let restProps = {};
    let className = '';

    $: ({ class: className, ...restProps } = $$restProps);

    $: props = {
        class: spreadClassnames(['fvs-page-title-icon', className]),
    };
</script>

<style>
    .fvs-page-title-icon {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        margin-left: 10px;

        border: 2px solid var(--t-color-border-page-title-icon);
        border-radius: 50%;
    }

    .page-title-icon-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;

        background-color: var(--t-color-background-page-title-icon);
        border-radius: 50%;
    }
</style>

<div {...props}>
    <div class="page-title-icon-inner">
        <Icon size="secondary" color="--t-color-text-page-title-icon">
            <slot />
        </Icon>
    </div>
</div>
