import appConfig from '$lib/app.config'
import Axios, { type CreateAxiosDefaults } from 'axios'
import type { XioniShop } from '../types'

export function useGroups(config?: CreateAxiosDefaults) {
	const { shopApiKey, shopApiBaseUrl } = appConfig

	const axios = Axios.create({
		baseURL: shopApiBaseUrl,
		...config,
		headers: {
			'api-key': shopApiKey,
			...config?.headers
		}
	})

	async function getGroups(): Promise<XioniShop.Group[]> {
		try {
			const { data } = await axios.get<XioniShop.Group[]>('/groups')

			return data
		} catch (error) {
			throw error
		}
	}

	async function getGroup(id: number): Promise<XioniShop.Group> {
		try {
			const { data } = await axios.get<XioniShop.Group>(`/groups/${id}`)

			return data
		} catch (error) {
			throw error
		}
	}

	async function getGroupByProductId(id: number): Promise<XioniShop.Group> {
		try {
			const { data } = await axios.get<XioniShop.Group>(`/products/${id}/group`)

			return data
		} catch (error) {
			throw error
		}
	}

	return {
		getGroupByProductId,
		getGroups,
		getGroup
	}
}
