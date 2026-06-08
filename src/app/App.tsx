import { AppShell } from './AppShell';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SkipLink } from '../components/layout/SkipLink';
import { Card } from '../components/ui/Card';

export function App() {
  return (
    <>
      <SkipLink />
      <Header />
      <AppShell>
        <main id="main-content" tabIndex={-1}>
          <section className="thesis-section">
            <h2>Context-aware Carbon Decision Advisor</h2>
            <p>
              HaritNirnay does not ask what did you emit. It asks what are you
              about to choose.
            </p>
            <p className="status-note">
              <strong>Current status: foundation scaffold only</strong>
            </p>
          </section>

          <section className="pillars-section">
            <h3>Evaluation Pillars</h3>
            <div className="pillars-grid">
              <Card title="Code Quality">
                <p>Clean structure, readability, and maintainability.</p>
              </Card>
              <Card title="Security">
                <p>Safe and responsible implementation. Local-first.</p>
              </Card>
              <Card title="Efficiency">
                <p>Optimal use of resources. No heavy libraries.</p>
              </Card>
              <Card title="Testing">
                <p>Validation of functionality through high coverage.</p>
              </Card>
              <Card title="Accessibility">
                <p>Inclusive and usable design (WCAG 2.1 AA).</p>
              </Card>
            </div>
          </section>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
