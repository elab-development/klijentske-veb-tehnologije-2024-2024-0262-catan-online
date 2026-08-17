import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setErrors({ confirmPassword: 'Popuni sva polja.' });
      return;
    }

    if (password.length < 6) {
      setErrors({ password: 'Lozinka mora imati bar 6 karaktera.' });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Lozinke se ne poklapaju.' });
      return;
    }

    setErrors({});
    navigate('/login');
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Registracija korisnika</h1>
        <p className="register-subtitle">Kreiraj nalog i započni svoju Catan avanturu</p>

        <form onSubmit={handleSubmit}>
          <FormField
            id="username"
            label="Korisničko ime"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormField
            id="email"
            label="Email adresa"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            id="password"
            label="Lozinka"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <FormField
            id="confirmPassword"
            label="Potvrda lozinke"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />
          <Button type="submit">Registruj se</Button>
        </form>

        <p className="register-footer">
          Već imaš nalog? <Link to="/login">Prijavi se</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;