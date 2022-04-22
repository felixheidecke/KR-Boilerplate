<script>
  export let subject = 'Subject';
  export let id = 0;
  export let items;

  const required = items
    .filter((item) => item.required)
    .map((item) => item.name)
    .join(',');
</script>

<form action="" class="Form">
  <input type="hidden" name="subject" value={subject} />
  <input type="hidden" name="id" value={id} />
  <input type="hidden" name="required" value={required} />

  {#each items as item}
    {#if item.type === 'select'}
      <Select {...item} />
    {:else if ['text', 'tel', 'email'].includes(item.type)}
      <Input {...item} />
    {:else if ['checkbox', 'radio'].includes(item.type)}
      <Checkbox {...item} />
    {/if}
  {/each}

  <Button ex-class="-button">Abschicken</Button>
</form>

<style lang="scss" global>
  .Form {
    @if mixin-exists(Form-reset) {
      @include Button-reset;
    } @else {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .-button {
        cursor: pointer;
        width: fit-content;
        border: 1px solid lightgray;
        border-radius: 0.333rem;
        padding: 0.5rem;
        font-size: 1rem;
        background-color: #eee;
      }
    }
  }
</style>
