<script lang="ts">
	import './Nav.scss'

	import classnames from 'classnames'
	import { page } from '$app/state'
	import { throttle } from 'lodash-es'
	import type { NavProps, NavRoute } from './Nav.d.ts'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Burger from '../NavBurger/NavBurger.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	let { routes, baseName = 'Nav', sticky, class: className }: NavProps = $props()

	// -----------------------------------------------------------------------------------------------

	let nav: HTMLElement
	let active = $state(false)
	let hoverState: number = $state(-1)

	let classNames = $derived(
		classnames(
			baseName,
			className,
			!active || baseName + '--active',
			!sticky || baseName + '--sticky'
		)
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

	let isCurrentPath = $derived((target: URL['pathname'] | undefined) => {
		if (!target || target === '/') return false

		return page.url.pathname.includes(target)
	})

	let isActivePath = $derived((target: URL['pathname'] | undefined) => {
		if (!target) return false

		return page.url.pathname === target
	})
</script>

<svelte:window on:scroll|passive={() => throttle(handleOffset, 250)} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<nav bind:this={nav} class={classNames} on:click={() => (active = false)}>
	<ul class={baseName + '__ul'} aria-label="navigation path">
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
					target={route.target}
					title={route.title}
					aria-current={isActivePath(route.path) ? 'page' : undefined}>
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
									aria-current={isActivePath(subRoute.path) ? 'page' : undefined}
									href={subRoute.path}
									target={subRoute.target}
									title={subRoute.title}>
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
