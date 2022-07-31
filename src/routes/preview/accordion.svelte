<script>
  let html = `
<Accordion>
  <AccordionSlide title="Larkspur">
    Larkspur ist eine Stadt im Marin County im US-Bundesstaat Kalifornien,
    Vereinigte Staaten, mit 11.800 Einwohnern (Stand: 2004). Die
    geographischen Koordinaten sind: 37,94° Nord, 122,53° West. Das
    Stadtgebiet hat eine Größe von 8,5 km².
  </AccordionSlide>
  <AccordionSlide title="Lionel Townsend Crawshaw">
    Lionel Townsend Crawshaw (* 1864 in Warmsworth bei Doncaster, South
    Yorkshire; † 1949 in Bath, Somerset) war ein britischer Maler, Aquarellist
    und Radierer.
  </AccordionSlide>
</Accordion>
`
</script>

<svelte:head>
  <title>Accordion | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>
  <Accordion>
    <AccordionSlide title="Larkspur">
      Larkspur ist eine Stadt im Marin County im US-Bundesstaat Kalifornien,
      Vereinigte Staaten, mit 11.800 Einwohnern (Stand: 2004). Die
      geographischen Koordinaten sind: 37,94° Nord, 122,53° West. Das
      Stadtgebiet hat eine Größe von 8,5 km².
    </AccordionSlide>
    <AccordionSlide title="Lionel Townsend Crawshaw">
      Lionel Townsend Crawshaw (* 1864 in Warmsworth bei Doncaster, South
      Yorkshire; † 1949 in Bath, Somerset) war ein britischer Maler, Aquarellist
      und Radierer.
    </AccordionSlide>
  </Accordion>
</div>
