<script>
  import icon from '@/js/use.icon';

  let html = `
<ul use:icon={'fas fa-caret-right'}>
  <li>Lorem ipsum</li>
  <li>Consectetur adipisicing</li>
  <li>Dolor sit amet</li>
</ul>
`;
</script>

<svelte:head>
  <title>List | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>

  <pre class="CodeHighlighter">&lt;script&gt;
&nbsp;&nbsp;import&nbsp;icon&nbsp;from&nbsp;&#39;@/js/use.icon&#39;;
&lt;/script&gt;</pre>

  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>

  <ul use:icon={'fas fa-caret-right'}>
    <li>Lorem ipsum</li>
    <li>Consectetur adipisicing</li>
    <li>Dolor sit amet</li>
  </ul>
</div>
