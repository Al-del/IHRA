# IHRA (Instant Healthy Recipe App) – Frontend

**Instant Healthy Recipe App (IHRA)** este o aplicație web modernă, creată cu **Angular + TypeScript** și utilizând **Server‑Side Rendering (SSR)** pentru performanță și SEO îmbunătățite. Scopul este de a simplifica deciziile alimentare, oferind rețete sănătoase generate automat pe baza ingredientelor disponibile.

---

## 🧩 Funcționalități principale

- **Autentificare / înregistrare** a utilizatorilor
- **Încărcare imagine** a frigiderului cu integrare API – analiza ingredientelor detectate
- **Listă rețete** generate din ingrediente detectate
- **Clasificare rețete** în funcție de sănătate și calorii
- **Rețete salvate** – afișare calorii, estimare exercițiu necesar
- **Vizualizare rețetă** – pași detaliați și calcul de efort fizic necesar
- **SSR Angular** pentru încărcări rapide și indexare SEO

---

## 🚀 Tehnologii utilizate

- **Angular** (ultimele versiuni, ~v16) + **TypeScript**
- **Angular Universal** pentru SSR
- **RxJS** – gestionare asincronă și interacțiuni
- **NgRx** (sau un alt state management) – pentru starea aplicației (autentificare, ingrediente, rețete)
- **Angular Material** (sau alt design system) – UI modern
- **HTTP Interceptors** – pentru token JWT, refresh automat
- **Formulare reactive** – login, upload imagine
- Integrare API REST/GraphQL – comunicare cu backend Flask

---

## 📁 Structură proiect

ihra-frontend/
├── src/
│ ├── app/
│ │ ├── core/ # servicii generice, interceptori, token, routing
│ │ ├── features/
│ │ │ ├── auth/ # login/registrare
│ │ │ ├── upload/ # upload imagine
│ │ │ ├── recipes/ # listă + vizualizare rețetă + salvare calorii
│ │ │ └── profile/ # setări și parametri biometrici
│ │ ├── shared/ # componente UI (buton, card, loading etc.)
│ ├── assets/
│ ├── environments/ # dev/prod config
│ └── main.ts
│ ├── main.server.ts # punct intrare SSR
├── angular.json
├── package.json
└── README.md


---

## 🔧 Instalare și rulare local

1. Clonează repo frontend:
   ```bash
   git clone https://github.com/Al-del/IHRA_frontend.git
   cd IHRA_frontend

    Instalează dependențe:

npm install

Rulează SSR în modul de dezvoltare:

    npm run dev:ssr

    – va porni server Express la http://localhost:4200.

Build pentru producție

npm run build:ssr
npm run serve:ssr

– build static + server SSR la dist/.
⚙️ Configurări de mediu

În src/environments/ configurează:

    API_URL – URL backend Flask (ex. http://localhost:5000/api)

    JWT_SECRET?, CLIENT_ID? – dacă folosești OAuth sau autentificare extinsă

Adaugă variabile suplimentare după nevoie, p.ex. pentru Sentry, Cloudinary etc.
📡 API Endpoints integrare

Interfața frontend consultă următoarele endpointuri (definește în shared/interfaces):

    POST /Auth/login, POST /Auth/register

    POST /Images/upload → returnează lista ingredientelor detectate

    GET /Recipes?ingredients=...

    GET /Recipes/{id}

    POST /Users/{id}/profile – salvează parametri (vârstă, greutate etc.)

    GET /Users/{id}/recipes/saved

🧪 Testare

    Unit tests – Jasmine + Karma:

npm run test

E2E tests – Cypress:

    npm run e2e

Păstrează o acoperire minimă de 80%.
🧭 Flux de dezvoltare

    Creează un nou feature branch:

git checkout -b feat/nume-funcționalitate

La final push și PR către develop, urmat de review

Merge în develop → pipeline CI/CD → build + test

Pe main mergi doar după validare

Deploy automat (Vercel, Netlify sau alt CI/CD internațional)
