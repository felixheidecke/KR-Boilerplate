<script>
  let code = `
<OpeningHours
  hours="Mo-Fr 09:00-22:00; Sa-Su 08:00-12:00; PH off"
  signOpen="we-are-open.png"
  signClosed="we-are-closed.png"
/>`
</script>

<svelte:head>
  <title>Opening Hours | Boilerplate</title>
</svelte:head>

<div data-page>
  <h2>Opening Hours</h2>

  <h3>Code</h3>
  <Code {code} />

  <OpeningHours
    hours="Mo-Fr 09:00-22:00; Sa-Su 08:00-12:00; PH off"
    signOpen="/images/we-are-open.png"
    signClosed="/images/we-are-closed.png"
  />
</div>
