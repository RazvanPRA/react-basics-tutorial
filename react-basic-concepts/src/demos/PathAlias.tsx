import { useState } from "react";

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

const codeStyle = {
  margin: 0,
  padding: "16px",
  overflowX: "auto" as const,
  textAlign: "left" as const,
  whiteSpace: "pre",
  fontFamily: "var(--mono)",
  fontSize: "14px",
  lineHeight: 1.55,
  color: "var(--text-h)",
  background: "var(--code-bg)",
  border: "1px solid var(--border)",
  borderRadius: "8px"
};

export function PathAlias() {
  const [usesAlias, setUsesAlias] = useState(false);
  const imports = usesAlias ? aliasImports : relativeImports;

  return (
    <section
      aria-label="Demonstrație alias de import"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 40px" }}
    >
      <p style={{ marginBottom: "20px" }}>
        <code>@/</code> pornește mereu din <code>src/</code>, indiferent unde se află fișierul care importă.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
        <button type="button" aria-pressed={!usesAlias} onClick={() => setUsesAlias(false)}>
          Fără alias (relativ)
        </button>
        <button type="button" aria-pressed={usesAlias} onClick={() => setUsesAlias(true)}>
          Cu alias @/
        </button>
      </div>

      <pre style={codeStyle} aria-live="polite">
        <code>{imports}</code>
      </pre>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginTop: "24px",
          textAlign: "left"
        }}
      >
        <article style={{ padding: "20px", border: "1px solid var(--border)", borderRadius: "8px" }}>
          <h2>tsconfig.app.json</h2>
          <p>
            Îi spune lui TypeScript și editorului că <code>@/</code> înseamnă <code>src/</code>: type-check, Go to
            Definition și autocomplete.
          </p>
          <p style={{ marginTop: "12px" }}>Dacă lipsește, IDE-ul va raporta importuri negăsite.</p>
        </article>
        <article style={{ padding: "20px", border: "1px solid var(--border)", borderRadius: "8px" }}>
          <h2>vite.config.ts</h2>
          <p>Îi spune lui Vite unde este fișierul real, atât în development, cât și la build.</p>
          <p style={{ marginTop: "12px" }}>
            Dacă lipsește, aplicația sau build-ul nu poate rezolva <code>@/...</code>.
          </p>
        </article>
      </div>
    </section>
  );
}
