import { writable, type Writable } from 'svelte/store'

import type MessageComponent from '../Message/Message.svelte'
import type { ComponentProps } from 'svelte'
import { uniqueId } from 'lodash-es'

// --- [ Types ] -----------------------------------------------------------------------------------

export namespace MessageBus {
	export interface Message {
		message: string
		config?: {
			type?: ComponentProps<MessageComponent>['type']
			timeout?: number
		}
	}

	export type Store = ReturnType<typeof MESSAGE_BUS>
}

// -------------------------------------------------------------------------------------------------

export const MESSAGE_BUS = function () {
	const { subscribe, set, update } = writable(new Map() as Map<string, MessageBus.Message>)

	function add(message: MessageBus.Message['message'], config: MessageBus.Message['config'] = {}) {
		const id = uniqueId()
		config = {
			type: 'info',
			timeout: 5000,
			...config
		}

		update(messages => {
			messages.set(id, { message, config })

			return messages
		})

		if (config.timeout) {
			setTimeout(() => {
				remove(id)
			}, config.timeout)
		}
	}

	function remove(id: string) {
		update(messages => {
			messages.delete(id)
			return messages
		})
	}

	return {
		subscribe,
		add,
		remove,
		reset: () => set(new Map())
	}
}
