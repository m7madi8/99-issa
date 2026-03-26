/**
 * Example: scroll-story shell with the hot drinks cinematic block.
 * Swap `App` for `Home` in `main.tsx` to preview in isolation.
 */
import HotDrinksSection from './components/HotDrinksSection';

export default function Home() {
  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      <HotDrinksSection />
    </main>
  );
}
