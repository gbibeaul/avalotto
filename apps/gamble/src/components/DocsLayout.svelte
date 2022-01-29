<script>
  export let metadata;
  export let title = [metadata?.title, 'Snowy Palace Docs'].filter(p => !!p).join(' | ');
</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="prose">
  <slot></slot>
</div>