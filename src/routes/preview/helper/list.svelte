<script>
  import icon from '@/js/use.icon'

  let code = `
<ul use:icon={'fas fa-caret-right'}>
  <li>Lorem ipsum</li>
  <li>Consectetur adipisicing</li>
  <li>Dolor sit amet</li>
</ul>
`
</script>

<svelte:head>
  <title>List | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>

  <Code code={`import icon from '@/js/use.icon'`} script />

  <Code {code} />

  <h3>Ergebnis</h3>

  <ul use:icon={'fas fa-caret-right'}>
    <li>Lorem ipsum</li>
    <li>Consectetur adipisicing</li>
    <li>Dolor sit amet</li>
  </ul>
</div>
