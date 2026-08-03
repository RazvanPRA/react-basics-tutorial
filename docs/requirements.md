# Cerințe

## Scop

Se dorește o aplicație educațională React care ajută dezvoltatorii aflați la început de drum în web să învețe progresiv JavaScript, TypeScript și React. Proiectul este un suport de învățare, nu un generator de cod: fiecare concept trebuie explicat, aplicat de cursant și verificat înainte de trecerea la pasul următor.

## Public țintă

Aplicația se adresează dezvoltatorilor care cunosc deja noțiuni de programare din Python, Java sau C#, însă nu au experiență practică în JavaScript, TypeScript, HTML/CSS modern sau React. Explicațiile trebuie să compare, când este util, conceptele noi cu idei familiare din aceste limbaje, fără a presupune cunoștințe React anterioare.

## Experiența de învățare

- Aplicația evoluează incremental împreună cu cursantul; nu se generează întregul proiect sau soluția completă de la început.
- Fiecare lecție prezintă un singur concept și include: explicație, exemplu de cod stabil și concis, exercițiu mic, indiciu și soluție disponibilă numai la cerere.
- Cursantul primește mai întâi contextul și pașii de implementare, apoi aplică schimbarea. Înțelegerea este verificată printr-o întrebare, o observație asupra rezultatului sau un exercițiu înainte de următorul concept.
- Interfața are butoane pentru navigarea directă către conceptele lecțiilor. Navigatorul inițial este implementat într-o singură pagină cu state React; rutarea este predată ulterior ca subiect separat.
- Materialul didactic este bilingv: explicațiile și instrucțiunile sunt afișate în paralel în română și engleză. Codul, numele de fișiere și identificatorii rămân în engleză.
- Cursantul poate marca lecțiile ca finalizate. Progresul este păstrat local în browser prin `localStorage`; nu există conturi, backend sau sincronizare în cloud în prima versiune.

## Cerințe tehnice pentru aplicația viitoare

- Proiectul va folosi Vite, React și TypeScript.
- Stilurile vor folosi CSS Modules și variabile CSS, fără framework CSS sau bibliotecă de componente în versiunea inițială.
- Exemplele trebuie să fie interactive atunci când acest lucru ajută la înțelegerea unui concept, accesibile din tastatură și ușor de inspectat.
- Codul aplicației va fi împărțit în componente mici, cu tipuri TypeScript explicite la granițele relevante. Dependențele suplimentare se adaugă numai când aduc valoare clară pentru obiectivul de învățare.
- Componentele și comportamentele importante vor avea teste. Exemplele de cod și interfața trebuie să respecte principiile de accesibilitate de bază.

## Curriculum

Parcursul complet trebuie să acopere, în ordine pedagogică, următoarele teme:

1. Fundamente web și JavaScript pentru React: module, variabile, funcții, obiecte și array-uri, destructurare, operatori, callback-uri, promisiuni și `async`/`await`.
2. Bazele TypeScript: inferență, tipuri, interfețe, tipuri pentru funcții și datele folosite de componente.
3. Configurarea Vite și structura unui proiect React.
4. JSX, componente, props și compoziția componentelor.
5. Evenimente, state, fluxul de date și actualizări de stare.
6. Randare condițională, liste, chei și ridicarea stării.
7. Formulare controlate și validare de bază.
8. Efecte, ciclul de viață, referințe și lucrul cu API-uri: încărcare, erori și date goale.
9. Context, hook-uri personalizate și separarea logicii reutilizabile.
10. Rutare client-side și navigare între pagini, predată după navigatorul inițial bazat pe state.
11. Testare de componente și comportamente, accesibilitate și depanare.
12. Performanță: memoizare, randări inutile și măsurarea înainte de optimizare.
13. Concepte de autentificare și securitate în aplicații React, fără a introduce un backend în versiunea inițială.
14. Pregătirea aplicației pentru producție și opțiuni de deployment.

## Documentație și instrucțiuni pentru agenți

- `CODEX.md`, în engleză, este sursa canonică pentru instrucțiunile de lucru ale agenților.
- `.github/copilot-instructions.md`, în engleză, este o copie generată și identică octet cu octet a fișierului `CODEX.md`. Nu se editează manual.
- Scriptul POSIX `scripts/sync-instructions.sh` sincronizează copia pentru Git Bash sau WSL. Opțiunea `--check` verifică sincronizarea fără a modifica fișiere.
- README-ul proiectului este în engleză și descrie stadiul actual, scopul, structura și comenzile de sincronizare.
