import WaitlistForm from "../components/WaitlistForm";

const benefits = [
  {
    number: "01",
    title: "Find your circle",
    text: "Meet ambitious women at a similar stage, with complementary skills and shared momentum.",
  },
  {
    number: "02",
    title: "Build with accountability",
    text: "Turn intentions into progress through focused check-ins, honest support and consistent action.",
  },
  {
    number: "03",
    title: "Grow through connection",
    text: "Discover collaborators, mentors, customers, opportunities and the confidence to move forward.",
  },
];

const memberBenefits = [
  "Priority access to Libbu",
  "Early founder and collaborator matching",
  "Invitations to accountability circles",
  "Access to selected networking events",
  "A voice in shaping the platform",
];

const audiences = ["Founders", "Side hustlers", "Consultants", "Creators", "Women in tech"];

export default function Home() {
  return (
    <main>
      <nav className="nav container">
        <a className="brand" href="#top" aria-label="Libbu home">
          Libbu<span>.</span>
        </a>
        <a className="nav-link" href="#waitlist">Join the waitlist</a>
      </nav>

      <section className="hero container" id="top">
        <div className="hero-copy">
          <p className="eyebrow">The private community for women building what’s next</p>
          <h1>
            Build your business with women who
            <span> understand the journey.</span>
          </h1>
          <p className="hero-text">
            Libbu uses intelligent matching to connect ambitious women with collaborators,
            accountability partners, mentors and opportunities that help them grow.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#waitlist">Become a founding member</a>
            <a className="text-link" href="#how-it-works">See how Libbu works →</a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>L</span><span>I</span><span>B</span><span>+</span>
            </div>
            <p>Join the first women shaping the heart of Libbu.</p>
          </div>
        </div>

        <div className="hero-card" aria-label="Libbu matching preview">
          <div className="card-orbit orbit-one" />
          <div className="card-orbit orbit-two" />
          <div className="match-card match-main">
            <p className="mini-label">Your Libbu matches</p>
            <h2>People who can help you move forward.</h2>
            <div className="match-row">
              <span className="profile-mark">F</span>
              <div><strong>Founder</strong><small>London · Looking for accountability</small></div>
            </div>
            <div className="match-row">
              <span className="profile-mark">M</span>
              <div><strong>Marketing consultant</strong><small>Manchester · Looking for startup clients</small></div>
            </div>
            <div className="match-row">
              <span className="profile-mark">A</span>
              <div><strong>AI product builder</strong><small>Bristol · Looking for collaborators</small></div>
            </div>
          </div>
          <div className="floating-note note-one">Matched by stage, goals and skills</div>
          <div className="floating-note note-two">Real connections. No noisy feed.</div>
        </div>
      </section>

      <section className="audience-strip" aria-label="Who Libbu is built for">
        <div className="container audience-strip-inner">
          <span>Built for</span>
          {audiences.map((audience) => <strong key={audience}>✓ {audience}</strong>)}
        </div>
      </section>

      <section className="statement-section">
        <div className="container statement-grid">
          <p className="eyebrow">Why Libbu</p>
          <div>
            <h2>LinkedIn helps you collect connections. Libbu helps you build meaningful ones.</h2>
            <p>
              Traditional networking creates contacts. Libbu is designed to create progress:
              relevant introductions, trusted circles and relationships with purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="how-section container" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>Connection with intention.</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.number}>
              <span>{benefit.number}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="audience-section">
        <div className="container audience-grid">
          <div>
            <p className="eyebrow">Built for your next chapter</p>
            <h2>Whether it’s still an idea or already becoming a business.</h2>
          </div>
          <div className="stage-list">
            <div><strong>Idea stage</strong><p>You need clarity, confidence and people who help you begin.</p></div>
            <div><strong>Building stage</strong><p>You need accountability, collaborators and honest feedback.</p></div>
            <div><strong>Growth stage</strong><p>You need partnerships, customers and wider opportunities.</p></div>
          </div>
        </div>
      </section>

      <section className="founding-section container">
        <div className="founding-card">
          <div>
            <p className="eyebrow light">Founding membership</p>
            <h2>Help us build a network that genuinely works for women.</h2>
            <p className="founding-copy">
              Founding members will be among the first to experience Libbu and influence
              the product, community and events from the beginning.
            </p>
          </div>
          <ul>
            {memberBenefits.map((benefit) => <li key={benefit}>✓ {benefit}</li>)}
          </ul>
        </div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <div className="container waitlist-grid">
          <div className="waitlist-copy">
            <p className="eyebrow">Become a founding member</p>
            <h2>Help shape the future of Libbu.</h2>
            <p>
              Tell us a little about your journey. Your answers will help us shape Libbu
              around the women it is being built for.
            </p>
            <blockquote>“Libbu” means heart, centre and inner self — the heart of women building together.</blockquote>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <footer className="footer container">
        <a className="brand" href="#top">Libbu<span>.</span></a>
        <p>Where women connect, build and grow.</p>
        <p>© {new Date().getFullYear()} Libbu</p>
      </footer>
    </main>
  );
}
