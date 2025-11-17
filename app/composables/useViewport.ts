export function useViewport() {
  const viewports = {
    mobile: 375,
    desktop: 1024,
  } as const;

  const isDesktop = ref(true);
  const isMobile = ref(false);

  function setViewport() {
    isDesktop.value = window.innerWidth >= viewports.desktop;
    isMobile.value = window.innerWidth < viewports.desktop;
  }

  onMounted(() => {
    setViewport();

    window.addEventListener("resize", setViewport);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", setViewport);
  });

  return {
    isDesktop,
    isMobile,
  };
}
