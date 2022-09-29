<script>
  import classnames from 'classnames'
  import { onMount } from 'svelte'
  import { MENU_CARD, fetchMenuCard } from '@/stores/menu-card'

  // --- Props ------------------------

  export let id

  // --- Data / Computed --------------

  $: menu = $MENU_CARD.get(id) || []

  // --- Methods ----------------------

  onMount(() => fetchMenuCard(id))

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniMenuCard'

  $: className = classnames(baseName, $$props.class)
</script>

<ol class={className} data-xioni-module={id}>
  {#each menu as category}
    <li class="{baseName}__category">
      <div class="{baseName}__category-description">
        <h3 class="{baseName}__category-name">{category.name}</h3>
        {@html category.description}
      </div>
      <ul class="{baseName}__dishes">
        {#each category.items as dish}
          <li class="{baseName}__dish">
            <h4 class="{baseName}__dish-title">{dish.name}</h4>
            <div class="{baseName}__dish-price">
              {formatPrice(dish.price)}
            </div>
            {#if dish.description}
              <div class="{baseName}__dish-description">
                {@html dish.description}
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ol>

<style>
  :where(.XioniMenuCard),
  :where(.XioniMenuCard__dishes) {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  :where(.XioniMenuCard__category + .XioniMenuCard__category) {
    margin-top: 2rem;
  }

  :where(.XioniMenuCard__category-title) {
    text-align: center;
  }

  :where(.XioniMenuCard__dish) {
    display: inline-block;
    width: 100%;
  }

  :where(.XioniMenuCard__dish + .XioniMenuCard__dish) {
    margin-top: 1rem;
  }

  :where(.XioniMenuCard__dish-title) {
    float: left;
    width: calc(100% - 5rem);
    margin: 0;
  }

  :where(.XioniMenuCard__dish-price) {
    float: right;
    width: 5rem;
    text-align: right;
  }

  :where(.XioniMenuCard__dish-description) {
    float: left;
    clear: both;
    width: 100%;
  }
</style>
