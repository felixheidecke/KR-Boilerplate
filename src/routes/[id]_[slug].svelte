<script context="module">
  export const load = async ({ params }) => ({ props: { id: params.id } });
</script>

<script>
  export let id;
</script>

<XioniArticle {id} author date />
