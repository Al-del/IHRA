# IHRA - Instant Healthy Recipe App (Frontend)

## 📝 Descriere

**IHRA (Instant Healthy Recipe App)** este o aplicație modernă care îți simplifică deciziile alimentare și te ajută să adopți un stil de viață sănătos. Cu IHRA, poți genera rețete personalizate bazate pe ingredientele pe care le ai deja în frigider!

## ✨ Funcționalități cheie

- **🔍 Detectare inteligentă a ingredientelor**: 
  - Fă o poză frigiderului tău și aplicația va identifica automat ingredientele disponibile
  - Utilizarea unui model YOLOv8 antrenat special pentru recunoașterea a peste 50 de ingrediente alimentare

- **🍳 Generare de rețete personalizate**: 
  - Primești sugestii de rețete bazate pe ingredientele detectate
  - Rețete generate de un model Flan-T5-small specializat în domeniul culinar

- **🏆 Clasificare a rețetelor după sănătate**: 
  - Vizualizează cât de sănătoasă este fiecare rețetă sugerată
  - Informații nutriționale detaliate pentru fiecare preparat

- **💪 Calculator de exercițiu fizic**: 
  - Estimează timpul necesar pentru a arde caloriile consumate
  - Model de regresie CatBoost care ia în considerare caracteristici demografice și fiziologice

- **📚 Rețete salvate**: 
  - Salvează rețetele preferite pentru acces rapid
  - Vezi istoricul preparatelor încercate

## 🛠 Tehnologii utilizate

### Frontend
- **Angular** cu TypeScript
- **Server-Side Rendering (SSR)** pentru performanță optimă
- Interfețe responsive și moderne

### Backend (comunică cu [IHRA Server](https://github.com/Al-del/IHRA_server_and_AI_training))
- Flask pentru API-ul principal
- Modele AI specializate:
  - YOLOv8 pentru detectarea ingredientelor
  - Flan-T5-small pentru generarea rețetelor
  - CatBoost pentru estimarea exercițiului fizic

## 🚀 Cum să rulezi proiectul

1. **Instalare dependențe**:
   ```bash
   npm install
   ```

2. **Configurare variabile de mediu**:
   Creează un fișier `.env` bazat pe `.env.example` și completează cu detaliile necesare.

3. **Pornire aplicație (mod development)**:
   ```bash
   npm run dev
   ```

4. **Build pentru producție**:
   ```bash
   npm run build
   npm start
   ```


Proiect realizat cu ❤️ de Gheorghica Istrate David
