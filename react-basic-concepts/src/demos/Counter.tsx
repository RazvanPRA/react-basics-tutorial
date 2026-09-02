import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Counter() {
  // Starea este păstrată de React între apelurile acestei funcții.
  const [count, setCount] = useState(0);

  // Componenta este o FUNCȚIE: React o execută din nou după schimbarea stării
  // și apoi actualizează în pagină doar ce diferă, inclusiv acest număr.
  return (
    <section className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-5 text-center">
      <p aria-live="polite" className="text-5xl font-semibold text-foreground">
        {count}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button aria-label="Crește contorul" onClick={() => setCount(c => c + 1)} size="icon">
          +
        </Button>
        <Button aria-label="Scade contorul" onClick={() => setCount(c => c - 1)} size="icon" variant="secondary">
          −
        </Button>
        <Button aria-label="Resetează contorul" onClick={() => setCount(() => 0)} size="icon" variant="outline">
          0
        </Button>
      </div>
      {/* Forma cu funcție primește mereu cea mai nouă valoare; astfel, mai multe
          actualizări consecutive se cumulează corect. */}
    </section>
  );
}
