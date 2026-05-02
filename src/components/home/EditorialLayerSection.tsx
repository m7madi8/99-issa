import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE_LUX = [0.19, 1, 0.22, 1] as const;

type EntrySide = 'left' | 'right';

type EditorialLayerSectionProps = {
  id: string;
  entrySide: EntrySide;
  layerIndex: number;
  children: ReactNode;
};

function usePointerTilt3D(enabled: boolean) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 88, damping: 22, mass: 0.45 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    if (!enabled) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [enabled, rotateX, rotateY]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    rotateX.set(-py * 20);
    rotateY.set(px * 24);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return { smoothRotateX, smoothRotateY, handlePointerMove, handlePointerLeave };
}

export function EditorialLayerSection({ id, entrySide, layerIndex, children }: EditorialLayerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const settledRef = useRef(false);
  const [stageAlive, setStageAlive] = useState(false);
  const reducedMotion = useReducedMotion();

  const tiltEnabled = stageAlive && !reducedMotion;
  const { smoothRotateX, smoothRotateY, handlePointerMove, handlePointerLeave } = usePointerTilt3D(tiltEnabled);

  const travelX = useMemo(() => {
    if (typeof window === 'undefined') {
      return entrySide === 'right' ? 160 : -160;
    }
    const w = window.innerWidth;
    if (w < 640) {
      const cap = Math.min(120, Math.round(w * 0.26));
      return entrySide === 'right' ? cap : -cap;
    }
    const cap = Math.min(260, Math.round(w * 0.3));
    return entrySide === 'right' ? cap : -cap;
  }, [entrySide]);

  const rotateY = entrySide === 'right' ? -16 : 16;
  const rotateX = 6.8;
  const enterZ = -42;

  const cascadeDelay = Math.min(0.08, layerIndex * 0.022);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(
      '.content-card__detail, .content-card__story-item, .content-card__mini, .content-card__metric, .content-card__list li',
    );
    if (targets.length === 0) return;

    const tilt = entrySide === 'right' ? -7 : 7;

    const ctx = gsap.context(() => {
      gsap.set(targets, { willChange: 'transform, opacity', force3D: true, transformOrigin: '50% 92%' });

      gsap.fromTo(
        targets,
        {
          y: 28,
          opacity: 0,
          rotateX: 14,
          rotationY: tilt,
          z: -52,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          rotationY: 0,
          z: 0,
          duration: 0.95,
          stagger: {
            each: 0.056,
            from: entrySide === 'right' ? 'start' : 'end',
          },
          ease: 'power3.out',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            gsap.set(targets, { clearProps: 'willChange' });
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [entrySide, id, reducedMotion]);

  const handlePanelEnterComplete = () => {
    if (settledRef.current) return;
    settledRef.current = true;
    if (!reducedMotion) {
      setStageAlive(true);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  };

  const enterMotion = reducedMotion
    ? {}
    : {
        initial: {
          opacity: 0,
          x: travelX,
          rotateY,
          rotateX,
          z: enterZ,
          scale: 0.978,
        } as const,
        whileInView: {
          opacity: 1,
          x: 0,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
        } as const,
        viewport: { once: true, amount: 0.16, margin: '0px 0px -5% 0px' } as const,
        transition: {
          opacity: { duration: 0.58, ease: EASE_LUX, delay: cascadeDelay + 0.02 },
          x: { duration: 1.12, ease: EASE_LUX, delay: cascadeDelay },
          rotateY: { duration: 1.22, ease: EASE_LUX, delay: cascadeDelay },
          rotateX: { duration: 1.16, ease: EASE_LUX, delay: cascadeDelay },
          z: { duration: 1.18, ease: EASE_LUX, delay: cascadeDelay },
          scale: { duration: 1.12, ease: EASE_LUX, delay: cascadeDelay },
        },
      };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`${id}-section editorial-section editorial-layer`}
      style={{
        zIndex: 2 + layerIndex,
        transformPerspective: 980,
      }}
      {...enterMotion}
      onAnimationComplete={reducedMotion ? undefined : handlePanelEnterComplete}
    >
      <div
        className={`editorial-layer__stage${stageAlive && !reducedMotion ? ' editorial-layer__stage--alive' : ''}`}
      >
        <motion.div
          className="editorial-layer__tilt"
          style={{
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            transformStyle: 'preserve-3d',
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
