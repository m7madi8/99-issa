import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import App from './App';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppLoader } from './components/AppLoader';
import './styles/globals.css';
import { useLenisScroll } from './hooks/useLenisScroll';

function waitForAppReady() {
  const minVisibleMs = 520;
  const started = performance.now();

  const fonts = document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve();

  const loaded = new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve(), { once: true });
  });

  return Promise.all([fonts, loaded]).then(() => {
    const elapsed = performance.now() - started;
    const rest = Math.max(0, minVisibleMs - elapsed);
    return new Promise<void>((r) => setTimeout(r, rest));
  });
}

function RootWithScroll() {
  useLenisScroll();
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    waitForAppReady().then(() => {
      if (!cancelled) setLoaderVisible(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <App />
      <AnimatePresence onExitComplete={() => ScrollTrigger.refresh()}>
        {loaderVisible ? <AppLoader key="app-loader" /> : null}
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootWithScroll />
  </StrictMode>,
);
