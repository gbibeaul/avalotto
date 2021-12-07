<script>
    import LogoBadge from '../LogoBadge/LogoBadge.svelte';
    import { spreadClassnames } from '../utils';

    /**
     * Specify the avatar variant which controls its size
     * @type {'primary' | 'secondary' | 'tertiary'}
     */
    export let variant = 'primary';

    /**
     * Specify the background-color property of the avatar when no image present. Applies the primary color from one of the twelve object colors.
     * @type {'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'}
     */
    export let color = 4;

    /**
     * Specify the image src for the avatar image. If one is not given, will fallback to using name property to display initials
     */
    export let image = '';

    /**
     * Specify the avatar name (required). Will be used as alt text for image, and if no image src is provided, will be transformed to display initials.
     */
    export let name = '';

    export let isAdmin = false;

    const getInitials = (fullName) => {
        const rgx = new RegExp(/[\s]*[\w]+\.[\s]*/, 'g');
        const names = fullName.replace(rgx, '').split(' ');
        let initials = names[0].substring(0, 1);

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1);
        }

        return initials.toUpperCase();
    };

    let props;

    $: props = {
        ...$$restProps,
        class: spreadClassnames([
            'fvs-avatar',
            variant && `fvs-avatar--${variant}`,
            color && `fvs-avatar--color-${color}`,
            $$restProps.class,
        ]),
    };
</script>

<style>
    .fvs-avatar--primary {
        --avatar-width: 50px;
        --avatar-height: 50px;
        --avatar-font-size: var(--t-font-heading-300-size);
        --avatar-line-height: var(--t-font-heading-300-line-height);
    }

    .fvs-avatar--secondary {
        --avatar-width: 80px;
        --avatar-height: 80px;
        --avatar-font-size: var(--t-font-heading-500-size);
        --avatar-line-height: var(--t-font-heading-500-line-height);
    }

    .fvs-avatar--tertiary {
        --avatar-width: 35px;
        --avatar-height: 35px;
        --avatar-font-size: var(--t-font-heading-100-size);
        --avatar-line-height: var(--t-font-heading-100-line-height);
    }

    .fvs-avatar--color-1 {
        --avatar-background-color: var(--t-color-object-1-primary);
    }

    .fvs-avatar--color-2 {
        --avatar-background-color: var(--t-color-object-2-primary);
    }

    .fvs-avatar--color-3 {
        --avatar-background-color: var(--t-color-object-3-primary);
    }

    .fvs-avatar--color-4 {
        --avatar-background-color: var(--t-color-object-4-primary);
    }

    .fvs-avatar--color-5 {
        --avatar-background-color: var(--t-color-object-5-primary);
    }

    .fvs-avatar--color-6 {
        --avatar-background-color: var(--t-color-object-6-primary);
    }

    .fvs-avatar--color-7 {
        --avatar-background-color: var(--t-color-object-7-primary);
    }

    .fvs-avatar--color-8 {
        --avatar-background-color: var(--t-color-object-8-primary);
    }

    .fvs-avatar--color-9 {
        --avatar-background-color: var(--t-color-object-9-primary);
    }

    .fvs-avatar--color-10 {
        --avatar-background-color: var(--t-color-object-10-primary);
    }

    .fvs-avatar--color-11 {
        --avatar-background-color: var(--t-color-object-11-primary);
    }

    .fvs-avatar--color-12 {
        --avatar-background-color: var(--t-color-object-12-primary);
    }

    .fvs-avatar {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--avatar-width);
        height: var(--avatar-height);

        color: var(--t-color-text-avatar-primary);
        font-size: var(--avatar-font-size);
        line-height: var(--avatar-line-height);

        background-color: var(--avatar-background-color);
        border-radius: 50%;
    }

    .avatar-image-container {
        width: 100%;
        height: 100%;
        overflow: hidden;

        border-radius: 50%;
    }

    .avatar-image {
        width: 100%;
    }

    .admin-badge {
        position: absolute;
        right: 0;
        bottom: 0;
    }
</style>

<div {...props}>
    {#if image}
        <div class="avatar-image-container">
            <img class="avatar-image" src={image} alt={name} />
        </div>
    {:else}{getInitials(name)}{/if}
    {#if isAdmin}
        <div class="admin-badge">
            {#if variant === 'secondary'}
                <LogoBadge size="large" />
            {:else if variant === 'tertiary'}
                <LogoBadge size="small" />
            {:else}
                <LogoBadge />
            {/if}
        </div>
    {/if}
</div>
