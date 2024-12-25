interface ScrollEffects {
  logo: HTMLElement | null;
  navBg: HTMLElement | null;
  scrollThreshold?: number;
}

export function updateNavigationStyles({ logo, navBg, scrollThreshold = 100 }: ScrollEffects) {
  const progress = Math.min(window.scrollY / scrollThreshold, 1);

  if (logo) {
    logo.style.opacity = `${1 - progress}`;
  }

  if (navBg) {
    navBg.style.backgroundColor = `rgba(255, 255, 255, ${0.08 * progress})`;
    navBg.style.backdropFilter = `blur(${12 * progress}px)`;
    navBg.style.boxShadow = `0px 0px ${30 * progress}px rgba(124, 58, 237, ${0.3 * progress})`;
  }
}

export function setupScrollEffects() {
  const elements = {
    logo: document.querySelector('[data-logo]') as HTMLElement | null,
    navBg: document.querySelector('[data-nav-bg]') as HTMLElement | null
  };

  if (!elements.logo || !elements.navBg) return;

  // Initial update
  updateNavigationStyles(elements);

  // Add scroll listener
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => updateNavigationStyles(elements));
  }, { passive: true });
}