import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Smart learning for classes 2 to 12</h1>
        <p>Access notes, resources, and mock tests to track your progress.</p>
        <div className="hero-actions">
          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary">
            I already have an account
          </Link>
        </div>
      </div>
    </section>
  );
}

