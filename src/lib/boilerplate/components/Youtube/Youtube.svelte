<script lang="ts">
	import classnames from 'classnames'

	// --- [ Types ] ---------------------------------------------------------------------------------
	import { YoutubePropsAllow, type YoutubeProps } from './Youtube.types'

	// --- [ Components ] ----------------------------------------------------------------------------

	import Aspect from '../Aspect/Aspect.svelte'

	// --- [ Props ] ---------------------------------------------------------------------------------

	export let ratio: YoutubeProps['ratio'] = [16, 9]
	export let videoId: YoutubeProps['videoId']
	export let allow: YoutubeProps['allow'] = [YoutubePropsAllow.ENCRYPTED_MEDIA]

	// --- [ Logic ] ---------------------------------------------------------------------------------

	const baseName = $$props['ex-class'] || 'YouTube'
	const className = classnames(baseName, $$props.class)
</script>

<Aspect class={className} ratio={ratio.join(':')}>
	<iframe
		class={baseName + '__frame'}
		src={'https://www.youtube-nocookie.com/embed/' + videoId}
		title="YouTube video player"
		frameborder="0"
		allow={allow.join('; ')}
		allowfullscreen
		style="width: 100%; height: 100%;" />
</Aspect>
