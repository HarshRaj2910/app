import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubjectsClick = () => {
    if (user?.classLevel) {
      navigate(`/classes/${user.classLevel}/subjects`);
    } else {
      navigate('/classes');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand-pill">
          <span className="brand-logo">★</span>
          <span className="brand-text">
            Edu
            <span className="brand-text-accent">MERN</span>
          </span>
        </Link>
        <div className="nav-pill-group">
          <button type="button" className="nav-pill" onClick={() => navigate('/')}>
            Home
          </button>
          <button type="button" className="nav-pill" onClick={handleSubjectsClick}>
            Subjects &amp; Tests
          </button>
          <button type="button" className="nav-pill" onClick={() => navigate('/dashboard')}>
            Progress
          </button>
        </div>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user-chip">
              <span className="chip-label">Hi</span>
              <span className="chip-name">{user.name}</span>
              <span className="chip-class">Class {user.classLevel}</span>
            </span>
            <button type="button" onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-pill">
              Login
            </Link>
            <Link to="/signup" className="btn-primary">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

