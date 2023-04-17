import type { XioniArticle } from '$lib/boilerplate/libraries/xioni/article.types'
import type { Component } from '../component.types'

export interface XioniArticleTileProps extends Component {
	tag?: string
	article: XioniArticle
	basePath?: string
	linkDelimiter?: string
	linkText?: string
}