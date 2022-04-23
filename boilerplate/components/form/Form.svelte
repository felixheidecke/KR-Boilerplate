<script>
  export let subject = 'Subject';
  export let id = 0;

  let required = '';
</script>

<form action="" class="Form">
  <input type="hidden" name="subject" value={subject} />
  <input type="hidden" name="id" value={id} />
  <input type="hidden" name="required" value={required} />

  <slot />
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
        border-radius: 0.25rem;
        padding: 0.5rem;
        font-size: 1rem;
        background-color: #eee;
      }
    }
  }
</style>
