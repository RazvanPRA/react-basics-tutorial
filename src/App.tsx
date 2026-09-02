import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActiveStepProvider, type ActiveStep, useActiveStep } from "@/context/ActiveStepProvider";
import { CounterClass } from "@/demos/CounterClass";
import { ContextDemo } from "@/demos/ContextDemo";
import { CustomHooks } from "@/demos/CustomHooks";
import { LiftingState } from "@/demos/LiftingState";
import { PathAlias } from "@/demos/PathAlias";
import { PrettierFormat } from "@/demos/PrettierFormat";
import { PureFunctions } from "@/demos/PureFunctions";
import { ShadcnSetup } from "@/demos/ShadcnSetup";
import { TailwindSetup } from "@/demos/TailwindSetup";
import Timer from "@/demos/Timer";
import { cn } from "@/lib/utils";
import "@/App.css";

type Demo = ActiveStep & { element: ReactNode };

const demos: Demo[] = [
  { id: "lifting-state", step: 1, title: "Lifting state up", element: <LiftingState /> },
  { id: "prettier", step: 2, title: "Formatare cu Prettier", element: <PrettierFormat /> },
  { id: "pure-functions", step: 3, title: "Funcții pure", element: <PureFunctions /> },
  { id: "counter-class", step: 4, title: "Componentă de clasă", element: <CounterClass /> },
  { id: "path-alias", step: 5, title: "Aliasuri de import", element: <PathAlias /> },
  { id: "timer", step: 6, title: "useEffect și cleanup", element: <Timer /> },
  { id: "custom-hooks", step: 7, title: "Custom hooks", element: <CustomHooks /> },
  { id: "context", step: 8, title: "Context global", element: <ContextDemo /> },
  { id: "tailwind-setup", step: 9, title: "Tailwind CSS v4", element: <TailwindSetup /> },
  { id: "shadcn-setup", step: 10, title: "shadcn/ui", element: <ShadcnSetup /> }
];

function DemoTab({ demo }: { demo: Demo }) {
  const { activeId, setActiveId } = useActiveStep();
  const active = demo.id === activeId;

  return (
    <Button
      aria-pressed={active}
      className="relative overflow-visible"
      onClick={() => setActiveId(demo.id)}
      size="sm"
      variant={active ? "default" : "secondary"}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute -right-2 -top-2 rounded-full px-1.5 py-0.5 text-xs",
          active ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
        )}
      >
        {demo.step}
      </span>
      Pas {demo.step}: {demo.title}
    </Button>
  );
}

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  const label = isDark ? "Activează tema deschisă" : "Activează tema închisă";

  return (
    <Button aria-label={label} onClick={onToggle} size="icon" title={label} variant="outline">
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}

function AppContent({ isDark, onToggleTheme }: { isDark: boolean; onToggleTheme: () => void }) {
  const { activeId } = useActiveStep();
  const active = demos.find(demo => demo.id === activeId) ?? demos[0];

  return (
    <>
      <nav
        aria-label="Demonstrații"
        className="flex flex-wrap items-center justify-center gap-3 border-b border-border bg-card p-4"
      >
        {demos.map(demo => (
          <DemoTab demo={demo} key={demo.id} />
        ))}
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </nav>
      <main className="flex flex-1 flex-col gap-8 py-8 sm:py-10">
        <h1>
          Pas {active.step} — {active.title}
        </h1>
        {active.element}
      </main>
    </>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);

    return () => document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <ActiveStepProvider steps={demos}>
      <AppContent isDark={isDark} onToggleTheme={() => setIsDark(current => !current)} />
    </ActiveStepProvider>
  );
}

export default App;
