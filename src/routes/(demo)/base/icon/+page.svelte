<!--

  <Icon> Parameter:
  *****************

  "name"   [string]
  "size"?  [string | number]

-->
<script>
	import icon from '$lib/boilerplate/actions/icon'
</script>

<svelte:head>
	<title>List | Boilerplate</title>
</svelte:head>

<h1 class="component-title">Icon</h1>

<Icon name="fas fa-walking" />
<Icon name="fas fa-walking" size="2" />
<Icon name="fas fa-walking" size="3" />
<Icon name="fas fa-walking" size="4" />

<ul class="$mt-2" use:icon={'fas fa-caret-right'}>
	<li>Lorem ipsum</li>
	<li>Consectetur adipisicing</li>
	<li>Dolor sit amet</li>
</ul>
