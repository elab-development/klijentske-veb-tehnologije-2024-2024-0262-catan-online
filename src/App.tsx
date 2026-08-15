import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Games from './pages/Games';
import GameBoard from './pages/GameBoard';
import Statistics from './pages/Statistics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/partije" element={<Games />} />
        <Route path="/partije/:id" element={<GameBoard />} />
        <Route path="/statistika" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
