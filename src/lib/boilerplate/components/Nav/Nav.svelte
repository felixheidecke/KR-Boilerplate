<script lang="ts">
	import './Nav.scss'

	import classnames from 'classnames'
	import { page } from '$app/stores'
	import { throttle } from 'lodash-es'

	// --- [ Types ] ---------------------------------------------------------------------------------

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
	export let sticky = false
	export let baseName = 'Nav'

	// -----------------------------------------------------------------------------------------------

	let nav: HTMLElement
	let active = false
	let hoverState: number = -1

	$: className = classnames(
		baseName,
		$$props.class,
		!active || baseName + '--active',
		!sticky || baseName + '--sticky'
	)

	function handleOffset() {
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
</script>

<svelte:window on:scroll|passive={() => throttle(handleOffset, 250)} />

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<nav
	bind:this={nav}
	class={className}
	aria-label="main navigation"
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
									target={subRoute.target}>
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

<Burger {active} on:click={() => (active = !active)} />
