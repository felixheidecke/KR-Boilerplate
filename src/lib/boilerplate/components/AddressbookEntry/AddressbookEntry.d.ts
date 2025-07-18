import type { XioniCMS } from '$lib/boilerplate/xioni/types'

export interface AddressbookEntryProps {
	baseName?: string
	tag?: string
	class?: string
	entry: XioniCMS.AddressbookEntry
}
