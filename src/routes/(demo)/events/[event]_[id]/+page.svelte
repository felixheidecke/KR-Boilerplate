<script>
	import './+page.css'

	import { writable } from 'svelte/store'
	import { setContext } from 'svelte'

	export let data

	const { event } = data

	setContext('active-xioni-event', writable(null))
</script>

<XioniEvent class="$mt-2" {event} />

<XioniEventRegistration formId={4}>
	<Grid tag="ul" gap class="$mb">
		<Grid tag="li" size="1-2">
			<Input name="Vorname" label="Vorname" required />
		</Grid>
		<Grid tag="li" size="1-2">
			<Input name="Nachname" label="Nachname" required />
		</Grid>
		<Grid tag="li" size>
			<Input name="Strasse" label="Straße & Hausnummer" required />
		</Grid>
	</Grid>
</XioniEventRegistration>

<hr />

<div class="$text-center">
	<Link icon="fas fa-reply" to="./">Zurück zur Übersicht</Link>
</div>
