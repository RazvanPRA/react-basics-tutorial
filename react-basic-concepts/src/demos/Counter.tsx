import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      <Button onClick={() => setCount(c => c + 1)}>+</Button>
      <Button onClick={() => setCount(c => c - 1)}>−</Button>
      <Button onClick={() => setCount(() => 0)}>0</Button>
      {/* Forma cu funcție primește mereu cea mai nouă valoare; astfel, mai multe
          actualizări consecutive se cumulează corect. */}
    </section>
  );
}
