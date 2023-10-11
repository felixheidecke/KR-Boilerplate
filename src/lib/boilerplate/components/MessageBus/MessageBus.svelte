<script lang="ts">
	import './MessageBus.css'

	import { blur } from 'svelte/transition'
	import type { MessageBus } from './MessageBus'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Message from '../Message/Message.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let messages: MessageBus.Store
	export let blurDuration = 250
</script>

<ul class="MessageBus">
	{#each $messages as message}
		<li in:blur={{ duration: blurDuration }} out:blur={{ duration: blurDuration }}>
			<Message
				title={message[1].title}
				type={message[1].config?.type}
				class="MessageBus--message"
				closable
				on:close={() => messages.remove(message[0])}>
				{@html message[1].message}
			</Message>
		</li>
	{/each}
</ul>
