<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
    const res = await fetch(`/api/get-docs/${params.slug}`);
    if (res.ok) {
      const data = await res.json();

      return {
        props: {
          metadata: data.metadata,
          content: data.content
        }
      }
    }

    return {
      status: 404,
      error: new Error('Document not found')
    }
  }
</script>
<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  export let content;
  export let metadata;
  export let title = [metadata.title, 'Gamebit Documentation'].filter(v => !!v).join(' | ')
</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="prose">
<SvelteMarkdown source={content} />
</div>