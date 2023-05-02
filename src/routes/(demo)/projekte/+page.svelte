<script>
	const { pages } = $$props.data
</script>

<table width="100%">
	<thead>
		<tr>
			<th>Website</th>
			<th>Version</th>
			<th>Build</th>
		</tr>
	</thead>
	<tbody>
		{#each pages as { url, data, ok, status }}
			<tr>
				<td>{new URL(url).hostname}</td>
				{#if ok}
					<td>{data.version}</td>
					<td>{data.build}</td>
				{:else}
					<td colspan="2"><em>(Error {status})</em> Fehler bei der Abfrage.</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	tbody {
		font-family: 'Courier New', Courier, monospace;
	}

	th {
		background-color: aliceblue;
		padding: 0.5rem;
	}

	td {
		padding: 0.5rem;
	}
</style>
