<script lang="ts">
	import {
		loadScript,
		type OnClickActions,
		type PayPalButtonsComponentOptions
	} from '@paypal/paypal-js'
	import { uniqueId } from 'lodash-es'
	import { createEventDispatcher, onMount } from 'svelte'

	export let clientId: string
	export let options: PayPalButtonsComponentOptions['style'] | null = null
	export let createOrderHandler: PayPalButtonsComponentOptions['createOrder']
	export let onApproveHandler: PayPalButtonsComponentOptions['onApprove']

	const emit = createEventDispatcher()
	const buttonId = uniqueId('paypal-buttons-')
	const style = {
		layout: 'horizontal',
		color: 'white',
		disableMaxWidth: false,
		tagline: false,
		height: 42,
		...options
	} as PayPalButtonsComponentOptions['style']

	async function onClickHandler(data: unknown, actions: OnClickActions) {
		emit('click', { data, actions })

		return
	}

	async function onErrorHandler(error: unknown) {
		emit('error', error)

		return
	}

	onMount(function () {
		if (!clientId) return

		loadScript({ clientId, currency: 'EUR' }).then(paypal => {
			if (!paypal) return

			// @ts-ignore no, this can NOT possibly be undefined ^^
			paypal
				.Buttons({
					style: style,
					createOrder: createOrderHandler,
					onApprove: onApproveHandler,
					onClick: onClickHandler,
					onError: onErrorHandler
				})
				.render('#' + buttonId)
		})
	})
</script>

<div id={buttonId} style="display:inline-flex"></div>
