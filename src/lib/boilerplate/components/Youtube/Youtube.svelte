<script lang="ts">
	import classnames from 'classnames'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Aspect from '../Aspect/Aspect.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let ratio: [number, number] = [16, 9]
	export let videoId: string
	export let allow: Array<
		'autoplay' | 'clipboard-write' | 'encrypted-media' | 'picture-in-picture'
	> = ['encrypted-media']

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'Youtube'
</script>

<Aspect class={classnames(baseName, $$props.class)} ratio={ratio.join(':')}>
	<iframe
		class={baseName + '__frame'}
		src={'https://www.youtube-nocookie.com/embed/' + videoId}
		title="Youtube video player"
		frameborder="0"
		allow={allow.join('; ')}
		allowfullscreen
		style="width: 100%; height: 100%;" />
</Aspect>
