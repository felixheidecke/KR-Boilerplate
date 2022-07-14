<script>
  import hours from 'src/data/openingHours.yml';
</script>

<svelte:head>
  <title>Website Titel</title>
</svelte:head>

<div data-comp>
  <h1>Welcome</h1>

  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt dolor iste
    tempore repellat molestiae ut quis eius, iusto exercitationem consequatur
    odio magnam, minus fuga ipsa cumque esse ab, nihil quae!
  </p>

  <OpeningHours {...hours} />

  <Toplink />
</div>
