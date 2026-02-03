import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupApi } from '../services/authApi';
import { useAuth } from '../context/AuthContext';

function validateEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

function getPasswordStrength(password) {
  if (!password) return '';
  if (password.length < 6) return 'Too short (min 6 characters)';
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Add letters and numbers for a stronger password';
  }
  return 'Looks good';
}

export default function SignupPage() {
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState(10);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const emailValid = !email || validateEmail(email);
  const passwordHint = getPasswordStrength(password);
  const passwordValid = !password || passwordHint === 'Looks good';
  const classValid = classLevel >= 2 && classLevel <= 12;
  const canSubmit =
    name && email && password && emailValid && passwordValid && classValid && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setLoading(true);
    try {
      const data = await signupApi({ name, email, password, classLevel });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Create your account</h2>
      <p className="form-subtitle">We&apos;ll personalise content based on your class.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="classLevel">
          Class (2-12)
          <input
            id="classLevel"
            type="number"
            min="2"
            max="12"
            value={classLevel}
            onChange={(e) => setClassLevel(Number(e.target.value))}
            required
          />
          {!classValid && (
            <span className="field-hint">Please enter a class between 2 and 12.</span>
          )}
        </label>
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
          {passwordHint && (
            <span className={`field-hint ${passwordValid ? 'hint-ok' : 'hint-warn'}`}>
              {passwordHint}
            </span>
          )}
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={!canSubmit}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

