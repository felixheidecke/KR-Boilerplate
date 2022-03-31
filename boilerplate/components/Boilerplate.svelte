<script>
  // Site Styles
  import 'boilerplate/js/array.toClass';
  import 'boilerplate/js/string.isTrue';

  import 'boilerplate/styles/style.scss';
  import 'src/styles/style.scss';

  import { breakpoints } from '../stores/breakpoints';
  import { onMount } from 'svelte';

  // --- Breakpoints --------------------------------------------

  let previousBreakpoints = {};

  const handleBreakpoints = () => {
    const width = window.innerWidth;
    let bp = {
      MOBILE: false,

      TABLET: false,
      TABLET_UP: false,
      TABLET_DOWN: false,

      DESKTOP: false,
      DESKTOP_UP: false,
      DESKTOP_DOWN: false,

      WIDESCREEN: false
    };

    // Mobile
    if (width < 768) bp.MOBILE = true;

    // Tablet
    if (width >= 768) bp.TABLET_UP = true;
    if (width <= 1024) bp.TABLET_DOWN = true;
    if (bp.TABLET_UP && bp.TABLET_DOWN) bp.TABLET = true;

    // Desktop
    if (width > 1024) bp.DESKTOP_UP = true;
    if (width <= 1440) bp.DESKTOP_DOWN = true;
    if (bp.DESKTOP_UP && bp.DESKTOP_DOWN) bp.DESKTOP = true;

    if (width > 1440) bp.WIDESCREEN = true;

    if (JSON.stringify(previousBreakpoints) == JSON.stringify(bp)) return;

    breakpoints.update(() => bp);
    previousBreakpoints = bp;
  };

  // Initialisazion

  const init = () => {
    handleBreakpoints();
  };

  onMount(() => {
    // Device detection
    if (
      window.navigator.userAgent.includes('Android') ||
      window.navigator.userAgent.includes('iPhone') ||
      window.navigator.userAgent.includes('iPad')
    ) {
      document.body.dataset.mobile = true;
    } else {
      document.body.dataset.desktop = true;
    }
  });
</script>

<svelte:body on:load={init()} />
<svelte:window on:resize|passive={handleBreakpoints} />

<!-- <style lang="scss" global>
  @import 'boilerplate/styles/style';
  @import 'src/styles/style';
</style> -->
