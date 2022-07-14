<div class="Error">
  <span><slot /></span>
</div>

<style global>
  :where(.Error) {
    padding: 1rem;
    background: #ffe3e3;
    border: 1px solid #ffb0b0;
    border-radius: 0.25rem;
    color: darken(#f00, 0.666);
    font-style: italic;
    box-shadow: 0 0 0.5rem rgba(#000, 0.25);
  }
</style>
