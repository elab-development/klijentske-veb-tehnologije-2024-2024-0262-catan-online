import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Popuni oba polja.');
      return;
    }

    try {
      login(email, password);
      const from = (location.state as { from?: string })?.from || '/';
      navigate(from);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Prijava korisnika</h1>
        <p className="login-subtitle">Prijavi se i nastavi svoju Catan partiju</p>

        <form onSubmit={handleSubmit}>
          <FormField
            id="email"
            label="Unesite email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            id="password"
            label="Unesite lozinku"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          />
          <Button type="submit">Prijavi se</Button>
        </form>

        <p className="login-footer">
          Nemaš nalog? <Link to="/register">Registruj se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;