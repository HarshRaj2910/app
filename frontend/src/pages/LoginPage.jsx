import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../services/authApi';
import { useAuth } from '../context/AuthContext';

function validateEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const emailValid = !email || validateEmail(email);
  const canSubmit = email && password && emailValid && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Welcome back</h2>
      <p className="form-subtitle">Login to continue learning and track your progress.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!emailValid && <span className="field-hint">Enter a valid email address</span>}
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={!canSubmit}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

