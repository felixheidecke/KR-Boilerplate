<script>
	import { writable } from 'svelte/store'
	import { setContext } from 'svelte'

	// --- Data --------------------------------------------------------------------------------------

	export let data

	setContext('active-xioni-event', writable(null))
</script>

<XioniEvent class="$mt-2" event={data.event} />

<XioniEventRegistration formId={4}>
	<Grid tag="ul" gap rowGap class="$mb">
		<Grid tag="li" size="1-2">
			<InputText name="Vorname" label="Vorname" required />
		</Grid>
		<Grid tag="li" size="1-2">
			<InputText name="Nachname" label="Nachname" required />
		</Grid>
		<Grid tag="li" size>
			<InputText name="Strasse" label="Straße & Hausnummer" required />
		</Grid>
	</Grid>
</XioniEventRegistration>

<Link class="$inline-block $mt-3 $mb-2" to="./" icon="fas fa-arrow-left">Zurück</Link>
