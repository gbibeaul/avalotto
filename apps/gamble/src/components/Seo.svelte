<script>
    import { seo } from "../stores/seo"
  </script>
  
  <svelte:head>
    <title>{$seo.title}</title>
    <meta name="description" content={$seo.description}>
  </svelte:head>