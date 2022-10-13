<script>
  import classnames from 'classnames'

  export let code
  export let script = false

  $: className = classnames('Code', !script || 'Code--script')
</script>

<pre class={className}>{code.trim()}</pre>

<style global>
  @import '//fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap';

  .Code {
    background-color: rgb(50, 50, 50);
    color: rgb(250, 250, 250);
    font-family: 'Roboto Mono', monospace;
    line-height: 175%;
    overflow-x: auto;
    padding: 1rem;
  }

  .Code--script::before {
    content: '<script>';
    color: #00ffcf;
  }

  .Code--script::after {
    content: '</script>';
    color: #00ffcf;
  }
</style>
