<script>
  import { range } from 'lodash-es';
  export let max = 3;
</script>

<div class="XioniSceleton" aria-hidden>
  {#each range(+max) as i}
    <div class="-group" data-id={i}>
      <div class="-item h2" style={`width: ${random(66, 88)}%`}>&nbsp;</div>
      <div class="-item p" style={`width: ${random(22, 77)}%`}>&nbsp;</div>
      <div class="-item p" style={`width: ${random(22, 77)}%`}>&nbsp;</div>
      <div class="-item p" style={`width: ${random(22, 77)}%`}>&nbsp;</div>
      <div class="-item p" style={`width: ${random(22, 77)}%;`}>&nbsp;</div>
    </div>
  {/each}
</div>

<style lang="scss">
  .XioniSceleton {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .-item {
      background-color: rgba(black, 0.05);
    }
  }
</style>
