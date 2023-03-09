<script lang="ts">
	import './Address.css'

	import Link from '../Link/Link.svelte'
	import Mail from '../Mail/Mail.svelte'

	export let name: string
	export let street: string
	export let town: string
	export let phone = ''
	export let email = ''
	export let web = ''
</script>

<ol class="Address">
	<li class="Address__name">{name}</li>
	<li class="Address__street">{street}</li>
	<li class="Address__town">{town}</li>
	<slot />
	{#if phone}
		<li class="Address__phone">
			<Link icon="fas fa-phone-alt" to={'tel://' + phone}>{phone}</Link>
		</li>
	{/if}
	{#if email}
		<li class="Address__email">
			<Mail to={email} />
		</li>
	{/if}
	{#if web}
		<li class="Address__web">
			<Link to={web} />
		</li>
	{/if}
</ol>
