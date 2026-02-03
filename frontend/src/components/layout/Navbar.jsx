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
        <Link to="/" className="brand">
          EduMERN
        </Link>
        <button type="button" className="nav-link" onClick={() => navigate('/')}>
          Home
        </button>
        <button type="button" className="nav-link" onClick={handleSubjectsClick}>
          Subjects & tests
        </button>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <button type="button" onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
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

