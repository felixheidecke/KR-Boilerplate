<script>
  export let text = 'Abschicken';
  export let disabled = false;
</script>

<button class="Submit" on:click {disabled}>{text}</button>

<style lang="scss">
  .Submit {
    width: fit-content;
    font-size: 1rem;
    background: #eee;
    padding: 0.75rem 1rem;
    border: 1px solid lightgray;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
