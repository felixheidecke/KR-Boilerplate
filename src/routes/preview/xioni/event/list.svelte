<script>
  let code = `<XioniEventList module="15" />`
</script>

<svelte:head>
  <title>XioniEventList | Boilerplate</title>
</svelte:head>

<div data-root>
  <h2 class="title">XioniEventList</h2>
  <h3>Code</h3>
  <Code {code} />

  <XioniEventList module="1289" limit="1" />
</div>
