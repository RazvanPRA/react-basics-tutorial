import { useState } from "react";
import { Button } from "@/components/ui/button";

// Configurăm aliasul acum deoarece shadcn/ui îl va cere când îl adăugăm mai târziu.
// Este util și fără shadcn/ui: după mutarea unui fișier, importurile @/ rămân stabile.
const relativeImports = `// src/components/chat/message/Bubble.tsx
import { formatMessageDate } from "../../../lib/dates";
import { Avatar } from "../../ui/avatar";

// src/App.tsx
import { Timer } from "./demos/Timer";`;

const aliasImports = `// src/components/chat/message/Bubble.tsx
import { formatMessageDate } from "@/lib/dates";
import { Avatar } from "@/components/ui/avatar";

// src/App.tsx
import { Timer } from "@/demos/Timer";`;

export function PathAlias() {
  const [usesAlias, setUsesAlias] = useState(false);
  const imports = usesAlias ? aliasImports : relativeImports;

  return (
    <section
      aria-label="Demonstrație alias de import"
      className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 text-left"
    >
      <p className="text-muted-foreground">
        <code>@/</code> pornește mereu din <code>src/</code>, indiferent unde se află fișierul care importă.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          aria-pressed={!usesAlias}
          onClick={() => setUsesAlias(false)}
          variant={!usesAlias ? "default" : "secondary"}
        >
          Fără alias (relativ)
        </Button>
        <Button
          aria-pressed={usesAlias}
          onClick={() => setUsesAlias(true)}
          variant={usesAlias ? "default" : "secondary"}
        >
          Cu alias @/
        </Button>
      </div>

      <pre
        aria-live="polite"
        className="overflow-x-auto rounded-card border border-border bg-muted p-4 text-left text-sm text-foreground"
      >
        <code>{imports}</code>
      </pre>

      <div className="grid gap-4 text-left sm:grid-cols-2">
        <article className="flex flex-col gap-3 rounded-card border border-border bg-card p-5 text-card-foreground">
          <h2>tsconfig.app.json</h2>
          <p>
            Îi spune lui TypeScript și editorului că <code>@/</code> înseamnă <code>src/</code>: type-check, Go to
            Definition și autocomplete.
          </p>
          <p>Dacă lipsește, IDE-ul va raporta importuri negăsite.</p>
        </article>
        <article className="flex flex-col gap-3 rounded-card border border-border bg-card p-5 text-card-foreground">
          <h2>vite.config.ts</h2>
          <p>Îi spune lui Vite unde este fișierul real, atât în development, cât și la build.</p>
          <p>
            Dacă lipsește, aplicația sau build-ul nu poate rezolva <code>@/...</code>.
          </p>
        </article>
      </div>
    </section>
  );
}
