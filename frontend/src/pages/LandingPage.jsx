import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuickStartClick = () => {
    if (user?.classLevel) {
      navigate(`/classes/${user.classLevel}/subjects`);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Made for CBSE / school learners</p>
          <h1>Smart learning hub for classes 2 to 12</h1>
          <p>
            Structured notes, curated resources, and mock tests in one place. Learn at your own pace
            and track your progress every week.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Start learning free
            </Link>
            <Link to="/login" className="btn-secondary">
              I already have an account
            </Link>
          </div>
          <p className="hero-sub">
            No credit card. Just sign up, pick your class, and start practicing.
          </p>
        </div>
      </section>

      <section className="lp-section lp-section-light" id="features">
        <div className="lp-section-inner">
          <h2>Everything you need to stay ahead</h2>
          <div className="lp-grid-3">
            <div className="lp-card">
              <h3>Class-wise notes</h3>
              <p>
                Clear, concise explanations for every chapter so you don&apos;t waste time searching
                across random sites or videos.
              </p>
            </div>
            <div className="lp-card">
              <h3>Curated resources</h3>
              <p>
                Handpicked PDFs, videos, and reference links mapped to each topic. Perfect for quick
                revision before exams.
              </p>
            </div>
            <div className="lp-card">
              <h3>Mock tests that matter</h3>
              <p>
                Practice with MCQ-based tests, see instant scores, and understand where you&apos;re
                strong or weak.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section" id="subjects-nav">
        <div className="lp-section-inner">
          <div className="lp-cta">
            <div>
              <h2>Jump straight to your subjects</h2>
              <p>
                Choose your class subjects and access notes, resources, and mock tests in just a few
                clicks.
              </p>
            </div>
            <div className="hero-actions">
              <button type="button" className="btn-primary" onClick={handleQuickStartClick}>
                {user ? 'Open my subjects' : 'Login to choose subjects'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section" id="how-it-works">
        <div className="lp-section-inner lp-two-col">
          <div>
            <h2>How it works</h2>
            <ol className="lp-steps">
              <li>
                <span className="lp-step-badge">1</span>
                <div>
                  <h4>Create your free account</h4>
                  <p>Sign up with your email, choose your class, and set your password.</p>
                </div>
              </li>
              <li>
                <span className="lp-step-badge">2</span>
                <div>
                  <h4>Open notes & resources</h4>
                  <p>
                    Browse subjects and chapters to read notes and explore curated study materials.
                  </p>
                </div>
              </li>
              <li>
                <span className="lp-step-badge">3</span>
                <div>
                  <h4>Attempt mock tests</h4>
                  <p>
                    Take quick chapter-wise tests, check your score, and repeat to improve every
                    week.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div className="lp-highlight">
            <h3>From Class 2 to Class 12</h3>
            <p>
              The same account works as you move from one class to the next. Content is organised by
              class, subject, and chapter so you never feel lost.
            </p>
            <ul className="lp-tags">
              <li>Maths</li>
              <li>Science</li>
              <li>English</li>
              <li>More coming soon</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="lp-section lp-section-light" id="cta">
        <div className="lp-section-inner lp-cta">
          <div>
            <h2>Ready to upgrade your study routine?</h2>
            <p>Join and start learning in under 60 seconds.</p>
          </div>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Create free account
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

