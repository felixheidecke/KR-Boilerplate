<script lang="ts" context="module">
	// --- Types -------------------------------------------------------------------------------------

	export enum NavType {
		SLIDE = 'slide',
		BAR = 'bar'
	}
</script>

<script lang="ts">
	import './Nav.scss'
	import classnames from 'classnames'
	import { ROUTES, ACTIVE_ROUTE } from '$lib/boilerplate/libraries/routes/index'

	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import { throttle } from 'lodash-es'

	// --- Components --------------------------------------------------------------------------------

	import Burger from '../NavBurger/NavBurger.svelte'

	// --- Methods -----------------------------------------------------------------------------------

	function hide(): void {
		hidden = true
	}

	function show(): void {
		setTimeout(() => (hidden = false))
	}

	function handleOffset(): void {
		if (!sticky || type === NavType.SLIDE) return

		const className = baseName + '--offset'
		const isOffset = nav.getBoundingClientRect().top === 0

		if (isOffset && !nav.classList.contains(className)) {
			nav.classList.add(className)
		} else if ((!isOffset && nav.classList.contains(className)) || window.pageYOffset === 0) {
			nav.classList.remove(className)
		}
	}

	// --- Data --------------------------------------------------------------------------------------

	export let variant: NavType | undefined = undefined
	export let breakpoint = '1024px'
	export let sticky = false

	let nav: HTMLElement
	let active = false
	let hidden = true
	let type = variant

	$: baseName =
		(() => {
			if (type === NavType.SLIDE) return 'NavSlide'
			if (type === NavType.BAR) return 'NavBar'
		})() || 'Nav'

	$: className = classnames(
		$$props['ex-class'] || baseName,
		$$props.class,
		!active || baseName + '--active',
		!sticky || baseName + '--sticky'
	)

	// --- Lifecycle ---------------------------------------------------------------------------------

	onMount(() => {
		if (!breakpoint || !browser || variant) return

		const media = window.matchMedia(`(max-width: ${breakpoint})`)
		type = media.matches ? NavType.SLIDE : NavType.BAR

		media.onchange = ({ matches }) => {
			hide()
			type = matches ? NavType.SLIDE : NavType.BAR
			show()
		}
	})

	// ACTIVE_ROUTE.init()
	show()
</script>

<svelte:window on:scroll|passive={() => throttle(handleOffset, 250)} />

<nav
	bind:this={nav}
	class={className}
	aria-label="main navigation"
	class:$hidden={hidden}
	on:click={() => (active = false)}
>
	<ul class={baseName + '__ul'}>
		{#each $ROUTES as route, i}
			<li class={baseName + '__li'}>
				<a
					id="route-{i}"
					class={classnames(baseName + '__a', $ACTIVE_ROUTE !== route || '__a--active')}
					href={route.path}
					on:click={() => ACTIVE_ROUTE.set(route.path)}
				>
					{route.name}
				</a>

				{#if !!route.routes?.length}
					<ul class={baseName + '__ul-ul'}>
						{#each route.routes as subRoute, o}
							<li
								class={classnames(
									baseName + '__li-li',
									$ACTIVE_ROUTE !== route || '__li-li--active'
								)}
							>
								<a
									id="route-{i}-{o}"
									class={baseName + '__a-a'}
									href={subRoute.path}
									on:click={() => ACTIVE_ROUTE.set(subRoute.path)}
								>
									{subRoute.name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
{#if type === NavType.SLIDE}
	<Burger {active} on:click={() => (active = !active)} />
{/if}
