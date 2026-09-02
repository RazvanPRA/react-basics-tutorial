import { Button } from "@/components/ui/button";
import { useActiveStep } from "@/context/ActiveStepProvider";
import { useCounter } from "@/hooks/useCounter";

type CounterCardProps = {
  label: string;
  count: number;
  onIncrement: () => void;
};

function CounterCard({ label, count, onIncrement }: CounterCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 text-left">
      <h3 className="text-lg font-medium text-card-foreground">{label}</h3>
      <p className="text-3xl font-semibold text-primary">{count}</p>
      <Button onClick={onIncrement}>+1</Button>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-card border border-border bg-muted p-4 text-left text-sm">
      <code>{children}</code>
    </pre>
  );
}

const recipe = `// 1. Creezi contextul cu undefined pentru protecție
const ActiveStepContext = createContext<ActiveStepContextValue | undefined>(undefined);

// 2. Providerul ține starea, citește/scrie localStorage și o partajează
function ActiveStepProvider({ steps, children }) {
  const [activeId, setActiveId] = useState(() => {
    const savedId = localStorage.getItem("react-basic-concepts.active-step");
    return steps.some(step => step.id === savedId) ? savedId! : steps[0].id;
  });
  useEffect(() => localStorage.setItem("react-basic-concepts.active-step", activeId), [activeId]);
  return <ActiveStepContext.Provider value={{ activeId, setActiveId, steps }}>{children}</ActiveStepContext.Provider>;
}

// 3. Hook-ul oprește folosirea greșită, în afara provider-ului
function useActiveStep() {
  const context = useContext(ActiveStepContext);
  if (context === undefined) throw new Error("useActiveStep trebuie folosit sub <ActiveStepProvider>.");
  return context;
}

// 4. Providerul stă deasupra consumatorilor
<ActiveStepProvider steps={demos}><AppContent /></ActiveStepProvider>

// 5. Orice descendent citește/scrie fără props
const { activeId, setActiveId, steps } = useActiveStep();`;

export function ContextDemo() {
  const { activeId, setActiveId, steps } = useActiveStep();
  // Fiecare apel de hook are propria instanță: copiii și adulții nu se influențează.
  const copii = useCounter(0, 1);
  const adulti = useCounter(0, 1);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5">
      <h2>Context: o valoare partajată, fără prop drilling</h2>
      <p className="text-muted-foreground">
        ID activ primit direct din context: <strong className="text-foreground">{activeId}</strong>. Schimbă un pas din
        meniul headerului și această valoare se actualizează fără niciun prop.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="flex flex-col gap-4 rounded-card border border-primary bg-primary/10 p-5 text-left">
          <h3 className="text-xl font-medium text-card-foreground">GLOBAL — useContext</h3>
          <p className="text-sm text-muted-foreground">
            Dropdown-ul este un al doilea meniu: scrie în exact aceeași stare ca headerul.
          </p>
          <label className="flex flex-col gap-2 font-medium text-card-foreground" htmlFor="active-step-select">
            Pas activ
          </label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
            id="active-step-select"
            onChange={event => setActiveId(event.currentTarget.value)}
            value={activeId}
          >
            {steps.map(step => (
              <option key={step.id} value={step.id}>
                Pas {step.step}: {step.title}
              </option>
            ))}
          </select>
        </article>

        <article className="flex flex-col gap-4 rounded-card border border-border bg-card p-5 text-left">
          <h3 className="text-xl font-medium text-card-foreground">LOCAL — useState / useCounter</h3>
          <p className="text-sm text-muted-foreground">
            Același hook reutilizat de două ori creează două stări independente.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <CounterCard label="Copii" count={copii.count} onIncrement={copii.increment} />
            <CounterCard label="Adulți" count={adulti.count} onIncrement={adulti.increment} />
          </div>
        </article>
      </div>

      <p className="text-sm text-muted-foreground">
        Aceeași rețetă se aplică la scară de aplicație pentru <code>ThemeProvider/useTheme</code> și pentru
        <code> CurrentStepProvider/useCurrentStep</code>.
      </p>
      <CodeBlock>{recipe}</CodeBlock>
    </section>
  );
}
