const createIconElement = (icon: string): HTMLElement => {
	const $el = document.createElement('i')
	$el.setAttribute('class', `Icon ${icon} $mr-1/2`)

	return $el
}

export default (node: HTMLElement, icon = 'fas fa-circle') => {
	node.querySelectorAll(':scope > li').forEach((li) => {
		const $icon = createIconElement(icon)
		li.prepend($icon.cloneNode())
	})
}