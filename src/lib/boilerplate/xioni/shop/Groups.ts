import config from '$lib/app.config'
import Axios from 'axios'
import type { XioniShop } from '../types'

export function useGroups(module: number, fetchFn: typeof fetch = fetch) {
	const axios = Axios.create({
		httpAgent: fetchFn,
		baseURL: config.api.url,
		headers: { 'api-key': config.api.key }
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
