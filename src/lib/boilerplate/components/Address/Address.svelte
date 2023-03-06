<script>
	import './Address.css'

	export let name
	export let street
	export let town
	export let phone = ''
	export let email = ''
	export let web = ''
</script>

<address class="Address">
	<ol>
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
</address>
