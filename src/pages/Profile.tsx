import { useAuth } from '../context/AuthContext';
import { useLocalGames } from '../hooks/useLocalGames';
import Button from '../components/Button';
import './Profile.css';

const RESOURCE_LABELS: Record<string, string> = {
  drvo: 'Drvo',
  cigla: 'Cigla',
  zito: 'Žito',
  ovca: 'Ovca',
  ruda: 'Ruda',
};

const getTotalResources = (resources: Record<string, number>): number =>
  Object.values(resources).reduce((sum, count) => sum + count, 0);

const Profile = () => {
  const { user } = useAuth();
  const { games } = useLocalGames();

  if (!user) {
    return null;
  }

  const totalGames = games.length;

  const wins = games.filter((game) => {
    if (game.status !== 'zavrsena' || game.players.length === 0) return false;
    const winner = [...game.players].sort(
      (a, b) => getTotalResources(b.resources) - getTotalResources(a.resources)
    )[0];
    return winner.id === game.players[0]?.id;
  }).length;

  const resourceTotals: Record<string, number> = { drvo: 0, cigla: 0, zito: 0, ovca: 0, ruda: 0 };
  games.forEach((game) => {
    const me = game.players[0];
    if (!me) return;
    Object.entries(me.resources).forEach(([key, value]) => {
      resourceTotals[key] = (resourceTotals[key] || 0) + value;
    });
  });

  const favoriteResourceKey = Object.entries(resourceTotals).sort((a, b) => b[1] - a[1])[0]?.[0];
  const favoriteResource =
    favoriteResourceKey && resourceTotals[favoriteResourceKey] > 0
      ? RESOURCE_LABELS[favoriteResourceKey]
      : '-';

  const recentGames = [...games]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const memberSince = new Date(user.createdAt).getFullYear();

  const initials = user.username
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleEditProfile = () => {
    window.alert('Izmena profila trenutno nije dostupna u ovoj verziji aplikacije.');
  };

  return (
    <div className="profile-page">
      <h1 className="profile-title">Profil korisnika</h1>
      <p className="profile-subtitle">Pregled osnovnih informacija, statistike i poslednjih Catan partija.</p>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <h2 className="profile-username">{user.username}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-member-since">Član od: {memberSince}.</p>
          <Button variant="primary" onClick={handleEditProfile}>
            Izmeni profil
          </Button>
        </div>

        <div className="profile-stats">
          <h2 className="profile-stats__heading">Statistika korisnika</h2>
          <div className="profile-stats__grid">
            <div className="profile-stat-box">
              <span className="profile-stat-box__label">Odigrane partije</span>
              <span className="profile-stat-box__value">{totalGames}</span>
            </div>
            <div className="profile-stat-box">
              <span className="profile-stat-box__label">Pobede</span>
              <span className="profile-stat-box__value">{wins}</span>
            </div>
            <div className="profile-stat-box">
              <span className="profile-stat-box__label">Najčešći resurs</span>
              <span className="profile-stat-box__value">{favoriteResource}</span>
            </div>
            <div className="profile-stat-box">
              <span className="profile-stat-box__label">Omiljeni mod</span>
              <span className="profile-stat-box__value">Lokalna partija</span>
            </div>
          </div>

          <div className="profile-recent">
            <h3 className="profile-recent__title">Poslednje partije</h3>
            {recentGames.length === 0 && (
              <p className="profile-empty">Još uvek nema odigranih partija.</p>
            )}
            {recentGames.map((game) => (
              <div key={game.id} className="profile-recent__row">
                <span className="profile-recent__name">{game.name}</span>
                <span className="profile-recent__meta">{game.players.length} igrača</span>
                <span className="profile-recent__meta">
                  Status: {game.status === 'u toku' ? 'u toku' : 'završena'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;