# Catan Online

Klijentska veb aplikacija za igranje lokalnih (offline) partija društvene igre Catan, razvijena u okviru seminarskog rada iz predmeta Klijentske veb tehnologije.

Aplikacija omogućava kreiranje lokalnih partija sa nasumično generisanom heksagonalnom tablom, simulaciju bacanja kockica preko spoljnog API-ja, praćenje raspodele resursa igrača i pregled statistike odigranih partija — sve sačuvano lokalno u browseru korisnika.

## Tehnologije

- **React 19** + **TypeScript** — biblioteka za izgradnju korisničkog interfejsa
- **Vite** — build alat i razvojni server
- **react-router-dom** — klijentska navigacija i rutiranje
- **react-konva** — grafički prikaz heksagonalne table igre
- **Random.org JSON-RPC API** — generisanje nasumičnih brojeva za raspored table i bacanje kockica
- **localStorage** — čuvanje lokalnih partija i podataka o korisniku

## Funkcionalnosti

- Prijava i registracija korisnika (lokalna simulacija)
- Nasumično generisanje rasporeda heksagonalnih polja table
- Simulacija bacanja kockica sa prikazom rezultata
- Praćenje i prikaz raspodele resursa po igraču
- Čuvanje i učitavanje lokalnih partija
- Statistika partije (broj bacanja, najčešći rezultati, raspodela resursa)
- Profil korisnika sa pregledom istorije partija

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


