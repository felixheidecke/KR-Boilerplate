<script>
  // Site Styles
  import('./Boilerplate.scss');

  import { breakpoints } from '@/stores/breakpoints';

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
</script>

<svelte:body on:load={init()} />
<svelte:window on:resize|passive={handleBreakpoints} />
