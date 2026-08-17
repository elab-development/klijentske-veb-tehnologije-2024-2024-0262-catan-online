import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Popuni oba polja.');
      return;
    }

    setError('');
    navigate('/');
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