<script>
	import { page } from '$app/stores'
</script>

<h3>🥵 Fehler {$page.status} ist aufgetreten!</h3>

<h4>Ist aber nicht so schlimm.</h4>

<p>
	Kehren Sie einfach wieder zur <Link to="/">Startseite</Link> zurück.<br />
	Dort geht es weiter, als sei nichts geschehen.
</p>

<hr />

<Message title="Error Code {$page.status}" type="error">
	<p class="$m-0">{$page.error.message}</p>
</Message>
