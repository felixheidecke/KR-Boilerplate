const createIconElement = (icon: string): HTMLElement => {
	const $span = document.createElement('span')
	$span.classList.add('fa-li')
	$span.innerHTML = `<i class="${icon}"></i>`

	return $span
}

export default (node: HTMLElement, icon = 'fas fa-circle') => {
	node.classList.add('fa-ul')

	node.querySelectorAll(':scope > li').forEach(li => {
		const $icon = createIconElement(icon)

		li.prepend($icon)
	})
}
