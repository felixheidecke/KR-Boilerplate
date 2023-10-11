<script lang="ts">
	export let company: string | undefined = undefined
	export let salutation: string
	export let name: string
	export let lastname: string
	export let address: string
	export let zip: string
	export let town: string
	export let email: string
	export let phone: string

	const className = 'XioniShopAddress'
</script>

<ol class={className}>
	{#if company}
		<li class="{className}__title">{company}</li>
	{/if}
	<li class="{className}__name">{salutation} {name} {lastname}</li>
	<li class="{className}__street">{address}</li>
	<li class="{className}__town">{zip} {town}</li>
	<slot />
	{#if phone}
		<li class="{className}__phone">
			{phone}
		</li>
	{/if}
	{#if email}
		<li class="{className}__email">
			{email}
		</li>
	{/if}
</ol>
