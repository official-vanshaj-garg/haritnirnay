import { AppShell } from './AppShell';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SkipLink } from '../components/layout/SkipLink';
import { TravelDecisionPage } from '../features/travel/TravelDecisionPage';

export function App() {
  return (
    <>
      <SkipLink />
      <Header />
      <AppShell>
        <main id="main-content" tabIndex={-1}>
          <section className="thesis-section">
            <p className="thesis-copy">
              HaritNirnay does not ask what did you emit. It asks what are you
              about to choose.
            </p>
          </section>
          <TravelDecisionPage />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
