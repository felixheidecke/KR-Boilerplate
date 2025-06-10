import { formatFromTo } from '$lib/boilerplate/utils/formatDate'
import { mapDtoImage } from './dtoImageMapper'
import { type SchemaEvent } from '../api/api'
import { type XioniCMS } from '../types'

export function mapDtoEvent(dto: SchemaEvent): XioniCMS.Event {
	const starts = new Date(dto.starts)
	const ends = new Date(dto.ends)
	const event: XioniCMS.Event = {
		id: dto.id,
		module: dto.module,
		slug: dto.slug,
		title: dto.title,
		teaser: dto.teaser || null,
		description: dto.description || null,
		address: dto.address || null,
		starts,
		ends,
		image: dto.image ? mapDtoImage(dto.image) : null,
		pdf: dto.pdf || null,
		website: dto.website ? new URL(dto.website) : null,
		ticketshopURL: dto.ticketshopURL ? new URL(dto.ticketshopURL) : null,
		organizer: dto.organizer || null,
		coordinates: dto.coordinates || null,
		duration: formatFromTo(starts, ends)
	}

	if (dto.images) {
		event.images = dto.images.map(mapDtoImage)
	}

	if (dto.tags) {
		event.tags = dto.tags
	}

	return event
}
