import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InfoCard from '../components/InfoCard';
import catanBoard from '../assets/catan-board.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-main">
        <div className="home-hero">
          <h1 className="home-title">Dobrodošli u Catan Online</h1>
          <p className="home-subtitle">
            Kreirajte lokalnu Catan partiju, bacajte kockice i pratite raspodelu resursa igrača na digitalnoj tabli.
          </p>
          <div className="home-actions">
            <Button onClick={() => navigate('/partije')}>Nova partija</Button>
            <Button variant="secondary" onClick={() => navigate('/partije')}>
              Nastavi partiju
            </Button>
          </div>
        </div>

      <div className="home-cards">
      <InfoCard
        title="Nasumična tabla"
        description="Aplikacija kreira raspored heksagonalnih pločica pomoću spoljnog API-ja."
      />
      <InfoCard
        title="Bacanje kockica"
        description="Rezultat bacanja kockica generiše se preko Random.org JSON-RPC servisa."
      />
      <InfoCard
        title="Resursi igrača"
        description="Prati se raspodela drveta, cigle, pšenice, ovce i rude za svakog igrača."
      />
      <InfoCard
        title="Statistika partije"
        description="Pregled broja bacanja, najčešćih rezultata i raspodele resursa."
      />
      <InfoCard
        title="Pravila"
        description="Pregled resursa i razvojnih karata korišćenih u igri."
        onClick={() => navigate('/pravila')}
        className="info-card--accent home-cards__pravila"
      />
     </div>
      </div>

      <div className="home-illustration">
        <img src={catanBoard} alt="Ilustracija Catan table" />
      </div>
    </div>
  );
};

export default Home;