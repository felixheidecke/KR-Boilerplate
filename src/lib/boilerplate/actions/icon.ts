export default (node: HTMLElement, icon: string) => {
	if (!icon) return

	node.querySelectorAll(':scope > li').forEach(li => {
		li.classList.add('fontello-' + icon)
	})
}
