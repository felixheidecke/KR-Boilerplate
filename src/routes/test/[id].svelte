<script context="module">
  import { articles as store, fetchArticle } from 'boilerplate/components/xioni/store.js';
  import { get } from 'svelte/store';

  export const load = async ({ params }) => {
    try {
      await fetchArticle(params.id);

      return {
        props: {
          article: get(store)
        }
      };
    } catch (error) {
      return error;
    }
  };
</script>

<script>
  export let article = {};
</script>

<p>Hallo</p>

<pre>{JSON.stringify(article, null, 2)}</pre>
