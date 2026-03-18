import { Badge, Button, Container, Panel } from './ui';
import ScrollReveal from './ScrollReveal';
import { media } from '../data/pageContent';

const joinUrl = 'https://pub2.pskt.io/t/fkbdcn';
const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(joinUrl)}`;

function RewardsHeader() {
  return (
    <header className="page-shell page-shell--light rewards-shell">
      <Container>
        <div className="page-shell__bar">
          <a href="/" className="page-shell__brand" aria-label="Back to home">
            <img src={media.logoPrimary} alt="" aria-hidden="true" />
          </a>

          <nav className="page-shell__nav" aria-label="Rewards page navigation">
            <a href="/franchise">Franchise</a>
            <a href="/membership">Membership</a>
            <a href="/">Home</a>
          </nav>
        </div>

        <div className="rewards-hero">
          <Badge tone="light">99 Rewards</Badge>

          <ScrollReveal
            as="h1"
            baseOpacity={0.24}
            baseRotation={0.35}
            blurStrength={1.2}
            scrub={1.2}
            containerClassName="page-hero__title"
          >
            Join 99 Rewards
          </ScrollReveal>

          <ScrollReveal
            as="p"
            baseOpacity={0.28}
            baseRotation={0.22}
            blurStrength={0.9}
            scrub={1.2}
            containerClassName="page-hero__body"
          >
            Scan the QR Code to become a member and unlock exclusive deals.
          </ScrollReveal>
        </div>
      </Container>
    </header>
  );
}

function JoinCard() {
  return (
    <section className="rewards-section rewards-section--join" id="join-99-rewards">
      <Container>
        <div className="rewards-join">
          <Panel className="rewards-join__copy">
            <div className="rewards-join__kicker">Member access</div>
            <h2 className="rewards-join__title">Exclusive deals, clean and simple.</h2>
            <p className="rewards-join__body">
              Membership feels premium when it’s frictionless: scan, join, and enjoy offers designed for return visits.
            </p>

            <div className="rewards-join__note">No complicated steps. Just scan and go.</div>
          </Panel>

          <Panel className="rewards-join__qr" aria-label="Join via QR code">
            <img className="rewards-qr__img" src={qrSrc} alt="QR code for joining 99 Rewards" />
            <div className="rewards-qr__meta">
              <strong>Scan to join</strong>
              <span>Opens your membership flow</span>
            </div>

            <div className="rewards-qr__cta">
              <Button href={joinUrl} variant="primary">
                Register with 99 Rewards
              </Button>
            </div>

            <div className="rewards-qr__fineprint">
              Tip: If the QR doesn’t load, try again on mobile.
            </div>
          </Panel>
        </div>
      </Container>
    </section>
  );
}

function RewardsOffer({ title, items, footer }: { title: string; items: string[]; footer: string }) {
  return (
    <div className="rewards-offer">
      <ScrollReveal
        as="h2"
        baseOpacity={0.22}
        baseRotation={0.25}
        blurStrength={0.9}
        scrub={1.1}
        containerClassName="rewards-offer__title"
      >
        {title}
      </ScrollReveal>

      <ul className="rewards-offer__list" aria-label={`${title} details`}>
        {items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="rewards-offer__footer">{footer}</div>
    </div>
  );
}

function RewardsSchedule() {
  return (
    <section className="rewards-section rewards-section--offers" id="rewards-offers">
      <Container>
        <div className="rewards-offers">
          <RewardsOffer
            title="FRIDAY 99 SPECIAL"
            items={[
              '99 Minutes • 99¢ Drinks',
              '7:30 AM — 9:09 AM',
              '9 Selected Drinks',
              'Limit 1 Drink Per Guest',
              'Rewards Members Only',
            ]}
            footer="⸻"
          />

          <RewardsOffer
            title="MIDWEEK 99"
            items={[
              'Buy Any Drink',
              'Get The Second One',
              'Mini $0.99',
              'Normal $1.99',
              'Maxi $2.99',
              'Second drink must be equal or smaller size',
            ]}
            footer="⸻"
          />
        </div>
      </Container>
    </section>
  );
}

export default function RewardsPage() {
  return (
    <main className="app-shell page-route page-route--rewards" id="top">
      <RewardsHeader />
      <JoinCard />
      <RewardsSchedule />
    </main>
  );
}

