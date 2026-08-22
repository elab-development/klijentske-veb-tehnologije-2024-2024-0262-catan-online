# Catan Online

Klijentska veb aplikacija za igranje lokalnih (offline) partija društvene igre Catan, razvijena u okviru seminarskog rada iz predmeta Klijentske veb tehnologije.

Aplikacija omogućava kreiranje lokalnih partija sa nasumično generisanom heksagonalnom tablom, simulaciju bacanja kockica preko spoljnog API-ja, kupovinu i korišćenje razvojnih karata, praćenje raspodele resursa igrača i pregled statistike odigranih partija — sve sačuvano lokalno u browseru korisnika.

## Tehnologije

- **React 19** + **TypeScript** — biblioteka za izgradnju korisničkog interfejsa
- **Vite** — build alat i razvojni server
- **react-router-dom** — klijentska navigacija i rutiranje
- **react-konva** — grafički prikaz heksagonalne table igre
- **canvas-confetti** — animacija konfeta pri pobedi
- **Random.org API** — generisanje nasumičnih brojeva za bacanje kockica
- **RandomUser.me API** — generisanje imena i avatara "bot" igrača
- **localStorage** — čuvanje naloga korisnika, sesije i lokalnih partija

## Funkcionalnosti

- Registracija i prijava korisnika (lokalna simulacija autentikacije)
- Zaštićene rute — pojedini delovi aplikacije dostupni su samo ulogovanim korisnicima
- Nasumično generisanje rasporeda heksagonalnih polja table (Fisher–Yates algoritam, uz sprečavanje susedstva brojeva 6 i 8)
- Simulacija bacanja kockica preko Random.org API-ja, sa lokalnim fallback-om
- Sistem redosleda poteza — resurs pri bacanju kockica dobija isključivo igrač na potezu
- Kupovina razvojnih karata (Vitez, Godina izobilja, Monopol, Gradnja puteva, Univerzitet, Biblioteka, Market, Velika dvorana, Kapela), sa realnim efektom na pobedničke poene
- Uslov kraja partije — dostizanjem 5 pobedničkih poena ili istekom maksimalnog broja rundi
- Modalni prikaz pobednika sa animacijom konfeta
- Generisanje "bot" igrača preko RandomUser.me API-ja (imena i avatari)
- Lista lokalnih partija sa paginacijom i filterima (status, broj igrača)
- Statistika partije — raspodela bacanja kockica i resursa, prikazana kroz grafikone
- Profil korisnika sa agregiranom statistikom (odigrane partije, pobede, najčešći resurs)
- Pregled pravila igre i svih resursnih/razvojnih karata, sa detaljnim prikazom u modalu
- Responzivan dizajn prilagođen mobilnim uređajima

## Pokretanje projekta lokalno

Potreban je instaliran [Node.js](https://nodejs.org) (LTS verzija).

```bash
# 1. Kloniraj repozitorijum
git clone https://github.com/elab-development/klijentske-veb-tehnologije-2024-2024-0262-catan-online.git

# 2. Uđi u folder projekta
cd klijentske-veb-tehnologije-2024-2024-0262-catan-online

# 3. Instaliraj zavisnosti
npm install

# 4. Pokreni razvojni server
npm run dev
```

Aplikacija će biti dostupna na `http://localhost:5173`.

## Struktura projekta

src/
  components/   -> reusable komponente (Navbar, Button, FormField, GameCard, HexBoard...)
  pages/        -> stranice aplikacije (Login, Register, Home, Games, GameBoard, Statistics...)
  models/       -> TypeScript klase i interfejsi (GameSession, Player, IDiceRoller, IUser...)
  hooks/        -> custom React hooks (useLocalGames)
  context/      -> React Context (AuthContext)
  services/     -> komunikacija sa spoljnim API-jima i localStorage (gameStorage, diceService, randomUserService, boardGenerator)
  styles/       -> globalne CSS promenljive i stilovi

## Autori

- Nikola Despenić
- Iva Zlatanović

## Dizajn

Vizuelni dizajn aplikacije kreiran je u Figma alatu u okviru prvog domaćeg zadatka.