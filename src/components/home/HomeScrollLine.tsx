import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export function HomeScrollLine() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const mainPath = mainPathRef.current;
    if (!root || !mainPath) return;

    const ctx = gsap.context(() => {
      const length = mainPath.getTotalLength();
      mainPath.style.strokeDasharray = `${length}`;
      mainPath.style.strokeDashoffset = `${length}`;

      if (reduceMotion) {
        mainPath.style.strokeDashoffset = '0';
        return;
      }

      gsap.to(mainPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.app-home',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="home-scroll-line" aria-hidden="true">
      <svg viewBox="0 0 1800 3000" preserveAspectRatio="none" role="presentation">
        <path
          ref={mainPathRef}
          className="home-scroll-line__main"
          d="M -140 140
             C 320 -120, 920 -120, 1380 120
             C 1710 300, 1730 540, 1420 710
             C 1060 910, 560 860, 180 1030
             C 260 1160, 420 1230, 560 1280
             C 660 1316, 748 1298, 748 1228
             C 748 1158, 650 1134, 590 1170
             C 532 1204, 546 1270, 640 1320
             C 370 1730, 860 1700, 1270 1830
             C 1660 1960, 1720 2220, 1420 2390
             C 1070 2590, 610 2580, 230 2720
             C 40 2790, -80 2860, -200 2960"
        />
      </svg>
    </div>
  );
}
