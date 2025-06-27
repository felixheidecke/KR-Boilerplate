import { formatFromTo } from '$lib/boilerplate/utils/formatDate'
import { mapDtoImage } from './dtoImageMapper'
import { type SchemaEvent, type SchemaFileDownload } from '../api/api.d'
import { type XioniCMS } from '../types'

// export function mapDtoFileDownload(dto: SchemaFileDownload): XioniCMS.FileDownload {
// 	const file: XioniCMS.FileDownload = {
// 		id: dto.id,
// 		module: dto.module
// 	}

// 	return file
// }

function getDocumentType(
	filename: string
): 'image' | 'document' | 'pdf' | 'audio' | 'video' | 'other' {
	const extension = filename.split('.').pop()?.toLowerCase() || ''
	const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg']
	const documentExtensions = ['doc', 'docx', 'odt', 'rtf', 'txt', 'xls', 'xlsx', 'ppt', 'pptx']
	const pdfExtensions = ['pdf']
	const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a']
	const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm']

	if (imageExtensions.includes(extension)) return 'image'
	if (documentExtensions.includes(extension)) return 'document'
	if (pdfExtensions.includes(extension)) return 'pdf'
	if (audioExtensions.includes(extension)) return 'audio'
	if (videoExtensions.includes(extension)) return 'video'
	return 'other'
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`

	const kb = bytes / 1024
	if (kb < 1024) return `${kb.toFixed(2)} KB`

	const mb = kb / 1024
	if (mb < 1024) return `${mb.toFixed(2)} MB`

	const gb = mb / 1024
	return `${gb.toFixed(2)} GB`
}
