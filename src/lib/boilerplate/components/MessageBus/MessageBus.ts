import { writable } from 'svelte/store'
import { uniqueId } from 'lodash-es'

// --- [ Types ] -----------------------------------------------------------------------------------

import type MessageComponent from '../Message/Message.svelte'
import type { ComponentProps } from 'svelte'

export namespace MessageBus {
	export interface Message {
		title?: string
		message: string
		config?: {
			id?: string
			type?: ComponentProps<MessageComponent>['type']
			timeout?: number
		}
	}

	export type Store = ReturnType<typeof MESSAGES>
}

// -------------------------------------------------------------------------------------------------

export const MESSAGES = function () {
	const { subscribe, set, update } = writable(new Map() as Map<string, MessageBus.Message>)

	function add(message: string, title?: string, config: MessageBus.Message['config'] = {}) {
		const id = config.id || uniqueId()
		config = {
			type: 'info',
			timeout: 5000,
			...config
		}

		update(messages => {
			messages.set(id, { title, message, config })

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
