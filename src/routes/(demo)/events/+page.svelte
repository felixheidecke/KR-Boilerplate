<script>
	export let data

	const { events } = data
</script>

<h1 class="$text-center $my-2">Unsere Events in 2023</h1>

<XioniEventList {events} detailPath="/events/" />
