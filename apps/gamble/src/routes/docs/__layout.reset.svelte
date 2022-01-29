<script>
  import './docs.css';
  export let metadata;
  export let title = [metadata?.title, 'Snowy Palace Docs'].filter(p => !!p).join(' | ');
</script>
<svelte:head>
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>
<style>
  .header {
    min-height: 125px;
    background-image: url(/assets/snowy-palace-documentation-banner.png);
    background-size: cover;
  }
  .logo {
    max-width: 280px;
  }
</style>
<header class="p-4 bg-slate-600 header">
  <img
    class="logo"
    src="/assets/snowy-palace-documentation-header.png"
    alt="Snowy Palace Documentation"
  />
</header>
<div class="prose p-2">
  <slot></slot>
</div>