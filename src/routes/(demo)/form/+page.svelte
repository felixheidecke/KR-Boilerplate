<Form subject="Kundenanfrage" id="4" attach="csv">
	<div class="customer-form-body">
		<Input name="fistname" label="Vorname" placeholder="Max" />
		<Input name="lastname" label="Nachname" placeholder="Mustermann" required />
		<Input name="street" label="Straße & Hausnummer" />
		<Input name="town" label="PLZ & Ort" />

		<div class="customer-form-voice-wrapper">
			<Radio name="voice" value="rye-bun" label="Roggen Vollkorn Brötchen" />
			<Radio name="voice" value="weat-bun" label="Weizenbrötchen" />
		</div>

		<Select
			name="topping"
			label="Welcher Belag soll es sein?"
			options={['Schinken', 'Salami', 'Käse']}
		/>
		<Textarea label="Ihre Nachricht an uns" name="message" />

		<Button class="customer-form-submit">Abschicken</Button>
	</div>
</Form>

<style lang="scss">
	.customer-form {
		&-body {
			max-width: 24rem;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&-voice-wrapper {
			display: flex;
			gap: 1.5rem;
		}
	}

	:global(.customer-form-submit) {
		width: fit-content;
		align-self: flex-end;
	}
</style>
