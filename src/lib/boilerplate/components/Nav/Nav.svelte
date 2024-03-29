<script lang="ts">
	import './Nav.scss'
	import classnames from 'classnames'

	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { throttle } from 'lodash-es'

	// --- [ Types ] ---------------------------------------------------------------------------------

	enum NavType {
		SLIDE = 'slide',
		BAR = 'bar'
	}

	type Route = {
		path?: string
		name: string
		class?: string
		routes?: Route[]
		target?: '_blank'
	}

	// --- [ Components ] ----------------------------------------------------------------------------

	import Burger from '../NavBurger/NavBurger.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let routes: Route[]
	export let variant: NavType | undefined = undefined
	export let breakpoint = '1024px'
	export let sticky = false

	// -----------------------------------------------------------------------------------------------

	let nav: HTMLElement
	let active = false
	let hidden = true
	let type = variant
	let hoverState: number = -1

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

	function hide(): void {
		hidden = true
	}

	function show(): void {
		setTimeout(() => (hidden = false))
	}

	function handleOffset() {
		if (!sticky || type === NavType.SLIDE) return

		const className = baseName + '--offset'
		const isOffset = nav.getBoundingClientRect().top === 0

		if (isOffset && !nav.classList.contains(className)) {
			nav.classList.add(className)
		} else if ((!isOffset && nav.classList.contains(className)) || window.pageYOffset === 0) {
			nav.classList.remove(className)
		}
	}

	$: isCurrentPath = (target: URL['pathname'] | undefined) => {
		if (!target || target === '/') return false

		return $page.url.pathname.includes(target)
	}

	$: isActivePath = (target: URL['pathname'] | undefined) => {
		if (!target) return false

		return $page.url.pathname === target
	}

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

	show()
</script>

<svelte:window on:scroll|passive={() => throttle(handleOffset, 250)} />

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<nav
	bind:this={nav}
	class={className}
	aria-label="main navigation"
	class:$hidden={hidden}
	on:click={() => (active = false)}>
	<ul class={baseName + '__ul'}>
		{#each routes as route, i}
			<li
				class={classnames(baseName + '__li', route.class)}
				on:mouseenter={() => (hoverState = i)}
				on:mouseleave={() => (hoverState = -1)}>
				<svelte:element
					this={route.path ? 'a' : 'span'}
					id="route-{i}"
					class={classnames(
						baseName + '__a',
						isActivePath(route.path) ? baseName + '__a--active' : null,
						isCurrentPath(route.path) ? baseName + '__a--current' : null
					)}
					href={route.path}
					target={route.target}>
					{route.name}
				</svelte:element>

				{#if !!route.routes?.length}
					<ul
						class={classnames(
							baseName + '__ul-ul',
							hoverState !== i || baseName + '__ul-ul--visible'
						)}>
						{#each route.routes as subRoute, o}
							<li class={baseName + '__li-li'}>
								<a
									id="route-{i}-{o}"
									class={classnames(
										baseName + '__a-a',
										isActivePath(subRoute.path) ? baseName + '__a-a--active' : undefined,
										subRoute.class
									)}
									href={subRoute.path}
									target={route.target}>
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
