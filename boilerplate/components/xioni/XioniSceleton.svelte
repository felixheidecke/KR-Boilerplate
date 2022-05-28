<script>
  import { range, random } from 'lodash-es';
  export let max = 3;
</script>

<div class="XioniSceleton" aria-hidden>
  {#each range(+max) as i}
    <div class="-group" data-id={i}>
      <div class="-item h2" style={`width: ${random(66, 88)}%`}>&nbsp;</div>
      {#each range(4) as o}
        <div class="-item p" data-id={`${i}-${o}`} style={`width: ${random(22, 77)}%`}>&nbsp;</div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  :where(.XioniSceleton) {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .-item {
      background-color: rgba(black, 0.05);

      + .-item {
        margin-top: 1rem;
      }
    }
  }
</style>
