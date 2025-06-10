import type { SchemaImage } from '../api/api'
import type { Image } from '../types'

/**
 * Maps a `SchemaImage` DTO to the `Image` object.
 *
 * @param dto - The source image data transfer object to adapt.
 * @returns An `Image` object with normalized properties:
 * - `src`: The image source URL.
 * - `description`: The image description, or `null` if not provided.
 * - `align`: The image alignment, defaults to `'auto'` if not specified.
 * - `srcset`: A shallow copy of the image source set.
 */
export function mapDtoImage(dto: SchemaImage): Image {
	return {
		src: dto.src,
		description: dto.description || null,
		align: dto.align || 'auto',
		srcset: { ...dto.srcset }
	}
}
