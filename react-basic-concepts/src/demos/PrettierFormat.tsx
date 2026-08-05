export function PrettierFormat() {
  return (
    <section>
      <h2>Formatare automată cu Prettier</h2>

      <p>
        Proiectul folosește Prettier cu punct și virgulă, ghilimele duble, lățime maximă de 120 de caractere și
        paranteze omise pentru un singur parametru de arrow function. Plugin-ul Tailwind este deja configurat pentru
        clasele care vor fi adăugate ulterior.
      </p>
      <p>
        În VS Code, formatarea rulează automat la salvare. Configurația este păstrată în proiect, astfel încât toată
        echipa are aceleași setări. Comanda <code>npm run format</code> rescrie fișierele, iar{" "}
        <code>npm run format:check</code> verifică formatarea fără modificări, potrivită pentru CI.
      </p>

      <h3>Când păstrăm intenționat formatul unui bloc</h3>
      <p>
        În JavaScript și TypeScript, <code>// prettier-ignore</code> pus imediat înaintea unei declarații îl lasă
        neschimbat:
      </p>
      <pre>
        <code>{`// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];`}</code>
      </pre>
      <p>
        În JSX, directiva este <code>{`{/* prettier-ignore */}`}</code> și se aplică elementului următor. În JS/TS, ea
        afectează doar nodul imediat următor: nu există varianta „ignoră de aici până aici”. Directivele{" "}
        <code>prettier-ignore-start</code> și <code>prettier-ignore-end</code> funcționează în Markdown, YAML și HTML,
        nu în JS.
      </p>
      <p>
        Folosim această excepție rar și motivat, de exemplu pentru matrice sau tabele de valori aliniate, nu pentru a
        evita convenția de formatare a proiectului.
      </p>
    </section>
  );
}
