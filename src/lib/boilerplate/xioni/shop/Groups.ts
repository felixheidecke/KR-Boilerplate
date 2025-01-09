import { API_BASE_URL } from '../constants'
import Axios from 'axios'
import config from '$lib/app.config'
import type { XioniShop } from '../types'

export function useGroups(module: number, fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: new URL('v5', API_BASE_URL).toString(),
		headers: {
			'api-key': config.krApiKey
		}
	})

	async function getGroups(): Promise<XioniShop.Group[]> {
		try {
			const { data } = await axios.get<XioniShop.Group[]>(`shop/${module}/groups`)

			return data
		} catch (error) {
			throw error
		}
	}

	async function getGroup(id: number): Promise<XioniShop.Group> {
		try {
			const { data } = await axios.get<XioniShop.Group>(`shop/${module}/groups/${id}`)

			return data
		} catch (error) {
			throw error
		}
	}

	async function getGroupByProductId(id: number): Promise<XioniShop.Group> {
		try {
			const { data } = await axios.get<XioniShop.Group>(`shop/${module}/products/${id}/group`)

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
