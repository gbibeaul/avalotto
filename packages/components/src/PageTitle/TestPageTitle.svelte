<script lang="ts">
    import Button from '../Button/Button.svelte';
    import PageTitle from './PageTitle.svelte';
    import PageTitleIcon from './PageTitleIcon.svelte';
    import PageTitleText from './PageTitleText.svelte';
    import PageTitleActions from './PageTitleActions.svelte';

    export let noWrap = false;
</script>

<PageTitle>
    <PageTitleIcon>mood</PageTitleIcon>
    <PageTitleText>This is a page title.</PageTitleText>
    <PageTitleActions {noWrap}>
        <Button>No</Button>
        <Button>Yes</Button>
    </PageTitleActions>
</PageTitle>
