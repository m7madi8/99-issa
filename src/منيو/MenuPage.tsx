import { Badge, Container } from '../components/ui';
import ScrollReveal from '../components/ScrollReveal';
import HotDrinksSection from '../components/HotDrinksSection';
import { brandMotto, media } from '../data/pageContent';

export default function MenuPage() {
  return (
    <main className="app-shell page-route menu-page" id="top" lang="en" dir="ltr">
      <header className="page-shell page-shell--light menu-page-shell menu-page-hero-only">
        <Container>
          <div className="page-shell__bar menu-page-header-bar">
            <a href="/" className="page-shell__brand" aria-label="Back to home">
              <img src={media.logoPrimary} alt="" aria-hidden="true" />
            </a>
          </div>

          <div className="menu-page-hero">
            <Badge tone="light">
             Menu
            </Badge>

            <ScrollReveal
              as="h1"
              baseOpacity={0.22}
              baseRotation={0.32}
              blurStrength={1.1}
              scrub={1.2}
              containerClassName="menu-page-hero__title"
            >
              <img
                src={media.logoPrimary}
                alt="99 Cafe"
                className="menu-page-hero__logo-mark"
              />
            </ScrollReveal>

            <ScrollReveal
              as="p"
              baseOpacity={0.26}
              baseRotation={0.2}
              blurStrength={0.85}
              scrub={1.2}
              containerClassName="menu-page-hero__body"
            >
              A curated selection, consistent quality in every location, and a calm presentation that reflects
              the brand.
            </ScrollReveal>

            <p className="page-motto" aria-label="Brand motto">
              {brandMotto}
            </p>
          </div>
        </Container>
      </header>

      <HotDrinksSection />
    </main>
  );
}
