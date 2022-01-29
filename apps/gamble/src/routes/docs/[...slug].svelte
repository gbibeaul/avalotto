<script context="module">
  import frontMatter from 'front-matter';
  const allDocs = import.meta.globEager(`./_docs/**/*.md`, {assert: {type: 'raw'}});
  const docsBySlug = {};
  for (const [path, doc] of Object.entries(allDocs)) {
    const slug = path.match(/^\.\/_docs\/(.*)\.md$/);
    const { attributes: metadata, body: content } = frontMatter(doc);
    docsBySlug[slug[1]] = {
      metadata,
      content,
    };
  }

  /** @type {import('@sveltejs/kit').Load} */
	export async function load({ params }) {
    const doc = docsBySlug[params.slug];
    if (doc) {
      const {metadata, content} = doc;

      return {
        props: {
          metadata,
          content,
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