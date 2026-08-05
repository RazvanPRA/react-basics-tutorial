# GPT.md

Instrucțiuni pentru asistenții AI care lucrează în acest repository.

> Acest fișier este sursa unică de adevăr pentru instrucțiunile AI.
> `.github/copilot-instructions.md` este o copie generată din el — vezi [Sincronizare](#sincronizare).

## Proiect

`react-basic-concepts/` este o aplicație Vite + React 19 + TypeScript folosită ca laborator personal de învățare pentru React. Fiecare concept studiat devine un demo în aplicație; scopul este înțelegerea conceptelor, nu livrarea unui produs.

Specificația traseului de învățare este în [docs/requirements.md](docs/requirements.md). Dacă documentul descrie o structură de directoare diferită, convențiile din acest fișier au prioritate pentru organizarea codului.

## Persoana căreia îi răspunzi

Este un dezvoltator experimentat în Python / Java / C#, fără experiență în JavaScript și React.

- Nu explica noțiuni generale de programare.
- Explică toate noțiunile specifice JavaScript și React, inclusiv cele aparent simple: `const` vs `let`, module ES, `map`, promisiuni și `async/await`.
- Leagă un concept nou de un echivalent din Python, Java sau C# atunci când există. Spune explicit când nu există un echivalent direct.
- Răspunde în română.

## Protocol de predare

Pentru fiecare concept, ordinea este: **explică → răspunde la întrebări → scrieți codul împreună**.

- Nu scrie codul unui concept înainte ca explicația să fie înțeleasă și înainte de confirmarea utilizatorului.
- Abordează un singur concept într-o sesiune.
- Scrie cel mai mic exemplu funcțional care demonstrează conceptul.
- Nu pregăti demo-uri pentru concepte viitoare. Folderele standard din secțiunea următoare pot exista goale.
- Când utilizatorul cere ghidare pas cu pas, nu livra soluția completă dintr-o dată.

## Structura obligatorie

Toate căile din această secțiune sunt relative la `react-basic-concepts/`.

```
src/
  App.tsx                 # shell-ul aplicației și registrul demo-urilor
  demos/                  # un concept / pas per fișier .tsx
  components/             # componente reutilizate de mai mulți pași
  hooks/                  # un custom hook per fișier
  context/                # un provider și hook-ul său de consum, per fișier
  lib/                    # helperi mici, fără UI
```

- Fiecare pas nou este într-un singur fișier: `src/demos/<Concept>.tsx`, de exemplu `Counter.tsx` sau `Timer.tsx`.
- Nu pune conținutul unui concept nou în `App.tsx` și nu aduna mai multe concepte în același demo.
- `App.tsx` rămâne scurt: este shell-ul și lista de demo-uri, nu locul conținutului fiecărui demo.

## Registrul playground-ului

Pe măsură ce se adaugă demo-uri, `App.tsx` definește și folosește exact această structură:

```ts
type Demo = { id: string; step: number; title: string; element: ReactNode }

const demos: Demo[] = []
const [activeId, setActiveId] = useState(demos[0]?.id ?? '')
const active = demos.find((demo) => demo.id === activeId) ?? demos[0]
```

- Un pas nou înseamnă numai două schimbări de cod: un fișier nou în `src/demos/` și o intrare nouă în `demos` din `App.tsx`.
- Shell-ul din `App.tsx` randează titlul în forma `Pas N — Titlu`; demo-ul randează numai propriul conținut.
- Meniul de navigare se construiește mai târziu, când există suficiente demo-uri. Până atunci se stabilește doar registrul și locul fiecărui demo.

## Convenții de cod și comentarii

- Folosește numai componente funcționale.
- Tipărește `props` cu un `type Props` local, în același fișier.
- Nu folosi `any` și nici non-null assertions (`!`) pentru a ascunde erori de tipare.
- Fiecare fișier de demo începe exact cu un antet în română de forma `// Pas N — <concept>.`.
- După antet, adaugă câteva linii de comentarii în română care explică **de ce** există pasul și ce problemă de învățare rezolvă, nu doar ce face codul.
- Orice alt comentariu explică de ce există codul sau de ce a fost aleasă o decizie; nu repetă mecanic codul.

## Definiția unui pas terminat

- Demo-ul rulează prin registrul din aplicație.
- `npm run build` trece fără erori.
- Pasul conține comentariile explicative cerute mai sus.
- Utilizatorul poate explica conceptul cu propriile cuvinte.

## Commit-uri

- Creează un commit separat pentru fiecare pas sau schimbare de structură distinctă.
- Pentru un concept, mesajul urmează forma: `pas N — concept (DemoName)`, de exemplu `pas 2 — useState (Counter)`.

## Stack și comenzi

Vite · React 19 · TypeScript · npm. Nu adăuga dependențe fără un motiv explicit, discutat. Vitest și React Testing Library se adaugă doar la pasul de testare.

```bash
npm install
npm run dev
npm run build
npm run preview
npm test
```

## Sincronizare

`.github/copilot-instructions.md` este o copie generată din acest fișier; nu o edita manual.

```bash
./scripts/sync-ai-instructions.sh
./scripts/sync-ai-instructions.sh --check
```
