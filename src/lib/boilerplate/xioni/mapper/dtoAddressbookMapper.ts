import type { SchemaAddressbookCategory, SchemaAddressbookEntry } from '../api/api.d'
import type { XioniCMS } from '../types'
import { mapDtoImage } from './dtoImageMapper'

/**
 * Maps a `SchemaAddressbookEntry` DTO to a `XioniCMS.AddressbookEntry` object.
 *
 * @param dto - The data transfer object representing an address book entry.
 * @returns The mapped `XioniCMS.AddressbookEntry` object with normalized and transformed fields.
 */
export function mapDtoAddressbookEntry(dto: SchemaAddressbookEntry): XioniCMS.AddressbookEntry {
	const entry: XioniCMS.AddressbookEntry = {
		id: dto.id,
		module: dto.module,
		title: dto.title || null,
		subtitle: dto.subtitle || null,
		name: dto.name || null,
		room: dto.room || null,
		address: dto.address || null,
		city: [dto.zip, dto.city].filter(Boolean).join(' ').trim() || null,
		phone: dto.phone || null,
		mobile: dto.mobile || null,
		fax: dto.fax || null,
		email: dto.email ? dto.email.toLowerCase() : null,
		web: dto.web ? new URL(dto.web) : null,
		description: dto.description || null,
		priority: dto.priority || 0,
		image: dto.image ? mapDtoImage(dto.image) : null,
		keywords: dto.keywords || null
	}

	return entry
}

/**
 * Maps a `SchemaAddressbookCategory` DTO to a `XioniCMS.AddressbookCategory` object.
 *
 * @param dto - The data transfer object representing an address book category.
 * @returns The mapped `XioniCMS.AddressbookCategory` object.
 */
export function mapDtoAddressbookCategory(
	dto: SchemaAddressbookCategory
): XioniCMS.AddressbookCategory {
	const category: XioniCMS.AddressbookCategory = {
		id: dto.id,
		module: dto.module,
		priority: dto.priority || 0,
		title: dto.title
	}

	if (dto.entries) {
		category.entries = (dto.entries as SchemaAddressbookEntry[]).map(mapDtoAddressbookEntry)
	}

	return category
}
