import { onMount } from 'svelte';
import { goto } from '$app/navigation';

onMount(() => {
  const { pathname } = document.location;
  if (pathname !== '/') goto(pathname);
});
