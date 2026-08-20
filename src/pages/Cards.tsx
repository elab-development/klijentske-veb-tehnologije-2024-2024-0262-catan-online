import { useState } from 'react';
import CardTile from '../components/CardTile';
import CardDetailModal from '../components/CardDetailModal';
import drvoImg from '../assets/cards/drvo.jpeg';
import ovcaImg from '../assets/cards/ovca.jpeg';
import zitoImg from '../assets/cards/zito.jpeg';
import kamenImg from '../assets/cards/kamen.jpeg';
import glinaImg from '../assets/cards/glina.jpeg';
import vitezImg from '../assets/cards/vitez.jpeg';
import godinaIzobiljaImg from '../assets/cards/godina-izobilja.jpeg';
import monopolImg from '../assets/cards/monopol.jpeg';
import gradnjaPutevaImg from '../assets/cards/gradnja-puteva.jpeg';
import univerzitetImg from '../assets/cards/univerzitet.jpeg';
import bibliotekaImg from '../assets/cards/biblioteka.jpeg';
import marketImg from '../assets/cards/market.jpeg';
import velikaDvoranaImg from '../assets/cards/velika-dvorana.jpeg';
import kapelaImg from '../assets/cards/kapela.jpeg';
import './Cards.css';

interface CardData {
  title: string;
  image: string;
  acquisition: string;
  purpose: string;
}

const resourceCards: CardData[] = [
  {
    title: 'Ovca',
    image: ovcaImg,
    acquisition: 'Igrač dobija kartu ovce svaki put kada se na kockicama dobije broj koji odgovara polju pašnjaka na kojem igrač ima izgrađeno naselje ili grad.',
    purpose: 'Karta se koristi kao jedna od obaveznih sirovina za izgradnju naselja i za kupovinu razvojnih karata.',
  },
  {
    title: 'Drvo',
    image: drvoImg,
    acquisition: 'Igrač prisvaja ovu kartu svaki put kada kockice pokažu broj polja sa šumom na kojem on ima svoje objekte, poput naselja ili gradova.',
    purpose: 'Drvo predstavlja neophodnu sirovinu koju igrač predaje banci kako bi mogao da postavlja putne pravce ili podiže nova naselja na mapi.',
  },
  {
    title: 'Žito',
    image: zitoImg,
    acquisition: 'Kartica žita ide u ruke igrača kada se aktivira broj na polju njiva na kojem on ima izgrađenu infrastrukturu.',
    purpose: 'Ovo je univerzalan resurs koji igrač troši za skoro svaku vrstu napretka: od pravljenja naselja i nadogradnje u gradove, do nabavke razvojnih karata.',
  },
  {
    title: 'Kamen',
    image: kamenImg,
    acquisition: 'Resurs se dobija iz planinskih predela onda kada bacanje kockica aktivira taj specifičan teren na kojem igrač ima naselje ili grad.',
    purpose: 'Kamen je igraču najvažniji za kasniji razvoj, jer mu omogućava transformaciju naselja u gradove i neophodan je deo cene za svaku razvojnu kartu.',
  },
  {
    title: 'Glina',
    image: glinaImg,
    acquisition: 'Ova karta se dodeljuje igraču kada rezultat bacanja kockica odgovara broju na polju brda gde se nalaze njegovi pioni.',
    purpose: 'Igrač koristi glinu kao primarni građevinski element bez kojeg nije moguće završiti konstrukciju puteva niti utemeljiti početna naselja.',
  },
];

const developmentCards: CardData[] = [
  {
    title: 'Vitez',
    image: vitezImg,
    acquisition: 'Igrač koji odigra ovu kartu odmah mora da pomeri figuru razbojnika na bilo koje drugo polje na mapi koje donosi resurse.',
    purpose: 'Karta omogućava igraču da blokira proizvodnju protivnika i da nasumično ukrade jedan resurs od igrača koji ima naselje ili grad pored novog polja razbojnika.',
  },
  {
    title: 'Godina izobilja',
    image: godinaIzobiljaImg,
    acquisition: 'Kada se ova karta odigra, igrač ima pravo da izabere bilo koje dve karte resursa direktno iz opšte zalihe (banke).',
    purpose: 'Služi igraču da trenutno dobije specifične sirovine koje mu nedostaju, a može uzeti ili dva različita resursa ili dva identična.',
  },
  {
    title: 'Monopol',
    image: monopolImg,
    acquisition: 'Igrač imenuje jednu vrstu resursa u trenutku kada odigra kartu.',
    purpose: 'Svi ostali igrači su obavezni da tom igraču predaju svaku kartu tog specifičnog resursa koju trenutno imaju u svom posedu.',
  },
  {
    title: 'Gradnja puteva',
    image: gradnjaPutevaImg,
    acquisition: 'Odigravanjem ove karte, igrač dobija mogućnost da postavi dva nova puta na mapi bez trošenja karata drveta i gline.',
    purpose: 'Ova akcija ubrzava širenje igrača i pomaže mu u takmičenju za dobijanje poena kroz najduži put.',
  },
  {
    title: 'Univerzitet',
    image: univerzitetImg,
    acquisition: 'Igrač drži ovu kartu tajno kod sebe i ne koristi je kao akcionu kartu tokom svog poteza.',
    purpose: 'Univerzitet vredi tačno 1 pobednički poen. Igraču služi kao strateška rezerva koja mu omogućava da brzo završi partiju.',
  },
  {
    title: 'Biblioteka',
    image: bibliotekaImg,
    acquisition: 'Biblioteka ostaje sakrivena u igračevom posedu i ne može biti oduzeta niti blokirana od strane drugih igrača.',
    purpose: 'Kartica biblioteke dodaje 1 pobednički poen igračevom ukupnom zbiru, i predstavlja poen koji je nemoguće izgubiti.',
  },
  {
    title: 'Market',
    image: marketImg,
    acquisition: 'Kao i ostale karte sa simbolom pehara, market se otkriva tek u trenutku kada igrač sa njim sakupi ukupan broj poena potreban za pobedu.',
    purpose: 'Ova karta igraču donosi 1 pobednički poen, i koristi se za jačanje pozicije bez privlačenja pažnje ostalih igrača.',
  },
  {
    title: 'Velika dvorana',
    image: velikaDvoranaImg,
    acquisition: 'Igrač čuva ovu kartu među svojim kartama i ne pokazuje je nikome dok ne odluči da završi igru.',
    purpose: 'Velika dvorana se računa kao 1 pobednički poen, i omogućava igraču diskretno napredovanje ka konačnom rezultatu.',
  },
  {
    title: 'Kapela',
    image: kapelaImg,
    acquisition: 'Ova karta se ne pokazuje ostalim igračima tokom partije i ostaje sakrivena u igračevoj ruci sve dok on ne odluči da završi igru.',
    purpose: 'Kapela igraču obezbeđuje 1 pobednički poen, omogućavajući mu da dostigne cilj pobede a da protivnici to ne primete.',
  },
];

const Cards = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  return (
    <div className="cards-page">
      <h1 className="cards-title">Pravila i karte</h1>
      <p className="cards-subtitle">Pregled resursa i razvojnih karata korišćenih u igri.</p>

      <div className="rules-box">
        <h2 className="cards-section-title">Osnovna pravila partije</h2>
        <ul className="rules-list">
          <li>Igra se sa 2 do 4 igrača na nasumično generisanoj heksagonalnoj tabli.</li>
          <li>Igrači naizmenično bacaju kockice — svako bacanje dodeljuje resurse igraču koji je trenutno na potezu, prema poljima čiji broj odgovara zbiru kockica.</li>
          <li>Partija traje ukupno 15 bacanja kockica.</li>
          <li>Nakon poslednjeg bacanja, pobednik je igrač sa najvećim ukupnim brojem sakupljenih resursa.</li>
        </ul>
      </div>

      <h2 className="cards-section-title">Resursi</h2>
      <div className="cards-grid">
        {resourceCards.map((card) => (
          <CardTile key={card.title} {...card} onClick={() => setSelectedCard(card)} />
        ))}
      </div>

      <h2 className="cards-section-title">Razvojne karte</h2>
      <div className="cards-grid">
        {developmentCards.map((card) => (
          <CardTile key={card.title} {...card} onClick={() => setSelectedCard(card)} />
        ))}
      </div>

      {selectedCard && (
        <CardDetailModal
          image={selectedCard.image}
          title={selectedCard.title}
          acquisition={selectedCard.acquisition}
          purpose={selectedCard.purpose}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default Cards;