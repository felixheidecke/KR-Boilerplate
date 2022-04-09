<script>
  // Site Styles
  import('./Boilerplate.scss');

  import { breakpoints } from '@/stores/breakpoints';

  // --- Breakpoints --------------------------------------------

  let previousBreakpoints = {};

  const handleBreakpoints = () => {
    const width = window.innerWidth;
    let bp = {
      mobile: false,
      tablet: false,
      'tablet-up': false,
      'tablet-down': false,
      desktop: false,
      'desktop-up': false,
      'desktop-down': false,
      widescreen: false
    };

    // Mobile
    if (width < 768) bp.mobile = true;

    // Tablet
    if (width >= 768) bp['tablet-up'] = true;
    if (width <= 1024) bp['tablet-down'] = true;
    if (bp['tablet-up'] && bp['tablet-down']) bp.tablet = true;

    // Desktop
    if (width > 1024) bp['desktop-up'] = true;
    if (width <= 1440) bp['desktop-down'] = true;
    if (bp['desktop-up'] && bp['desktop-down']) bp.desktop = true;

    if (width > 1440) bp.widescreen = true;

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
