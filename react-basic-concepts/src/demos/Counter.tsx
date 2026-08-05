import { useState } from "react";

export function Counter() {
  // Starea este păstrată de React între apelurile acestei funcții.
  const [count, setCount] = useState(0);

  // Componenta este o FUNCȚIE: React o execută din nou după schimbarea stării
  // și apoi actualizează în pagină doar ce diferă, inclusiv acest număr.
  return (
    <section>
      <p aria-live="polite" style={{ fontSize: "3rem" }}>
        {count}
      </p>
      <button type="button" onClick={() => setCount(c => c + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCount(c => c - 1)}>
        −
      </button>
      <button type="button" onClick={() => setCount(() => 0)}>
        0
      </button>
      {/* Forma cu funcție primește mereu cea mai nouă valoare; astfel, mai multe
          actualizări consecutive se cumulează corect. */}
    </section>
  );
}
