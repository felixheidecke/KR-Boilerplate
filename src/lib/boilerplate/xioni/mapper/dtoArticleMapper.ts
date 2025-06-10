import type { SchemaArticle, SchemaArticleParagraph } from '../api/api'
import type { XioniCMS } from '../types'
import { mapDtoImage } from './dtoImageMapper'

/**
 * Maps a `SchemaArticle` DTO to the `XioniCMS.Article` object.
 *
 * @param dto - The data transfer object representing an article, conforming to the `SchemaArticle` interface.
 * @returns The mapped article as a `XioniCMS.Article` object.
 *
 * @remarks
 * - Converts date strings to `Date` objects if present.
 * - Maps the `image` property using `mapDtoImage` if available.
 * - Converts the `website` string to a `URL` object if present.
 * - Maps the `content` array using `mapDtoArticleContent` if provided.
 */
export function mapDtoArticle(dto: SchemaArticle): XioniCMS.Article {
	const article: XioniCMS.Article = {
		id: dto.id,
		module: dto.module,
		slug: dto.slug,
		title: dto.title,
		date: dto.date ? new Date(dto.date) : null,
		teaser: dto.teaser,
		image: dto.image ? mapDtoImage(dto.image) : null,
		pdf: dto.pdf || null,
		website: dto.website ? new URL(dto.website) : null,
		author: dto.author || null
	}

	if (dto.content) {
		article.content = dto.content.map(mapDtoArticleContent)
	}

	return article
}

/**
 * Maps a `SchemaArticleParagraph` DTO to the `XioniCMS.ArticleContent` object.
 *
 * @param dto - The data transfer object representing an article paragraph.
 * @returns The mapped `ArticleContent` object with id, title, text, and image properties.
 */
export function mapDtoArticleContent(dto: SchemaArticleParagraph): XioniCMS.ArticleContent {
	return {
		id: dto.id,
		title: dto.title || null,
		text: dto.text || null,
		image: dto.image ? mapDtoImage(dto.image) : null
	}
}
