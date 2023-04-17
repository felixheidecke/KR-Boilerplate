<script>
	import { writable } from 'svelte/store'
	import { setContext } from 'svelte'

	const { event } = $$props.data

	setContext('active-xioni-event', writable(null))
</script>

<XioniEvent class="$mt-2" {event} />

<XioniEventRegistration formId={4}>
	<Input name="Name" label="Name" placeholder="Vor- und Nachname" class="$mt" required />
	<Textarea name="Anschrift" label="Anschrift" class="$mt" required />
	<Input name="Telefon" label="Telefonnummer" class="$mt" required />
	<Input type="Email" name="Email" label="E-Mail-Adresse" class="$mt" required />
	<Textarea name="Nachricht" label="Nachricht" class="$mt" />
	<Checkbox
		name="datenschutz"
		label="Ich habe die <a href='/datenschutz'>Datenschutzerklärung</a> zur Kenntnis genommen und stimme zu, dass meine Angaben und Daten zur Beantwortung meiner Anfrage elektronisch erhoben und gespeichert werden."
		value="akzeptiert"
		class="$mt"
		required />
	<div slot="done">
		<p>Vielen Dank für Ihre Anmeldung.</p>
	</div>
</XioniEventRegistration>

<div class="$text-center $mt-2">
	<Link icon="fas fa-reply" to="./">Zurück zur Übersicht</Link>
</div>
