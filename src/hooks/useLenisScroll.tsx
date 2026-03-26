import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      ScrollTrigger.update();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      lerp: 0.1,
    } as never);

    // Expose Lenis to other components (e.g. menu) for scroll locking.
    (window as any).__lenis = lenis;
    (window as any).__lenisStop = () => (lenis as any).stop?.();
    (window as any).__lenisStart = () => (lenis as any).start?.();

    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value) {
        /* ScrollTrigger يضبط التمرير أثناء الـ pin — يجب أن يكون فورياً وإلا يتعطّل الـ scrub والـ pin مع Lenis */
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      ScrollTrigger.clearScrollMemory();
      delete (window as any).__lenis;
      delete (window as any).__lenisStop;
      delete (window as any).__lenisStart;
    };
  }, []);
}

