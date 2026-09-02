import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

const STORAGE_KEY = "react-basic-concepts.active-step";

export type ActiveStep = {
  id: string;
  step: number;
  title: string;
};

type ActiveStepContextValue = {
  activeId: string;
  setActiveId: Dispatch<SetStateAction<string>>;
  steps: ActiveStep[];
};

// `undefined` ne permite să semnalăm imediat consumul în afara provider-ului.
const ActiveStepContext = createContext<ActiveStepContextValue | undefined>(undefined);

type ActiveStepProviderProps = {
  steps: ActiveStep[];
  children: ReactNode;
};

export function ActiveStepProvider({ steps, children }: ActiveStepProviderProps) {
  if (steps.length === 0) {
    throw new Error("ActiveStepProvider are nevoie de cel puțin un pas.");
  }

  const [activeId, setActiveId] = useState(() => {
    const savedId = localStorage.getItem(STORAGE_KEY);
    const savedStepExists = steps.some(step => step.id === savedId);

    // La refresh păstrăm doar un ID care mai există în lista curentă de pași.
    return savedStepExists ? savedId! : steps[0].id;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeId);
  }, [activeId]);

  // O singură sursă de adevăr: toți consumatorii primesc aceeași valoare.
  return <ActiveStepContext.Provider value={{ activeId, setActiveId, steps }}>{children}</ActiveStepContext.Provider>;
}

// Hook-ul este exportat lângă provider intenționat: formează API-ul aceluiași context.
// eslint-disable-next-line react-refresh/only-export-components
export function useActiveStep() {
  const context = useContext(ActiveStepContext);

  if (context === undefined) {
    throw new Error("useActiveStep trebuie folosit sub <ActiveStepProvider>.");
  }

  return context;
}
