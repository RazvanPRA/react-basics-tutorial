import { useState, type ReactNode } from "react";
import { CounterClass } from "@/demos/CounterClass";
import { LiftingState } from "@/demos/LiftingState";
import { PathAlias } from "@/demos/PathAlias";
import { PrettierFormat } from "@/demos/PrettierFormat";
import { PureFunctions } from "@/demos/PureFunctions";
import { TailwindSetup } from "@/demos/TailwindSetup";
import Timer from "@/demos/Timer";
import "@/App.css";

type Demo = { id: string; step: number; title: string; element: ReactNode };

const demos: Demo[] = [
  { id: "lifting-state", step: 6, title: "Lifting state up", element: <LiftingState /> },
  { id: "prettier", step: 0, title: "Formatare cu Prettier", element: <PrettierFormat /> },
  { id: "pure-functions", step: 1, title: "Funcții pure", element: <PureFunctions /> },
  { id: "counter-class", step: 4, title: "Componentă de clasă", element: <CounterClass /> },
  { id: "path-alias", step: 7, title: "Aliasuri de import", element: <PathAlias /> },
  { id: "timer", step: 11, title: "useEffect și cleanup", element: <Timer /> },
  { id: "tailwind-setup", step: 20, title: "Tailwind CSS v4", element: <TailwindSetup /> }
];

function App() {
  const [activeId, setActiveId] = useState("lifting-state");
  const active = demos.find(demo => demo.id === activeId) ?? demos[0];

  return (
    <>
      <nav aria-label="Demonstrații">
        {demos.map(demo => (
          <button key={demo.id} type="button" onClick={() => setActiveId(demo.id)}>
            Pas {demo.step}: {demo.title}
          </button>
        ))}
      </nav>
      <main>
        <h1>
          Pas {active.step} — {active.title}
        </h1>
        {active.element}
      </main>
    </>
  );
}

export default App;
