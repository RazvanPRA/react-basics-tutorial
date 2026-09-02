import { useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const manualCardStyle: CSSProperties = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  boxShadow: "var(--shadow)",
  color: "var(--card-foreground)",
  maxWidth: "24rem",
  padding: "24px",
  textAlign: "left"
};

export function TailwindSetup() {
  const [usesTokens, setUsesTokens] = useState(false);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-5 pb-10 text-left">
      <div className="w-full rounded-card border border-border bg-muted p-3 text-sm text-muted-foreground">
        Comută tema din bara de navigație pentru a vedea cum tokenii actualizează componentele.
      </div>

      <div className="inline-flex rounded-card border border-border bg-muted p-1 text-sm font-semibold">
        <Button
          aria-pressed={!usesTokens}
          className={cn(
            "rounded-card px-3 py-2 transition",
            !usesTokens ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground"
          )}
          onClick={() => setUsesTokens(false)}
        >
          Stiluri scrise de mână
        </Button>
        <Button
          aria-pressed={usesTokens}
          className={cn(
            "rounded-card px-3 py-2 transition",
            usesTokens ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground"
          )}
          onClick={() => setUsesTokens(true)}
        >
          Utilitare + tokeni
        </Button>
      </div>

      {/*
        Utility-first is not mainly about fewer lines of code. Styles stay next to
        their structure, while spacing, colors, and radii come from a fixed scale.
        This makes the UI consistent instead of inventing values per component.

        Long class lists keep the styling on the element instead of making us hunt
        through another file. Prettier sorts Tailwind classes into a canonical order.
      */}
      {usesTokens ? (
        <article className="w-full max-w-sm rounded-card border border-border bg-card p-6 text-card-foreground shadow-lg">
          <p className="mb-2 text-sm font-semibold text-primary">Plan Pro</p>
          <h2 className="mb-2 text-2xl font-semibold text-card-foreground">Un spațiu de lucru ordonat</h2>
          <p className="mb-6 text-base text-muted-foreground">
            O experiență de lucru consecventă, construită din valori reutilizabile.
          </p>
          <Button>Alege planul</Button>
        </article>
      ) : (
        <article className="flex flex-col gap-4" style={manualCardStyle}>
          <p style={{ color: "var(--primary)", fontSize: "14px", fontWeight: 600 }}>Plan Pro</p>
          <h2 style={{ color: "var(--card-foreground)", fontSize: "24px" }}>Un spațiu de lucru ordonat</h2>
          <p style={{ color: "var(--muted-foreground)" }}>
            O experiență de lucru consecventă, construită din valori reutilizabile.
          </p>
          <Button>Alege planul</Button>
        </article>
      )}
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        {usesTokens
          ? "Tokenii se schimbă odată cu tema, deci cardul se adaptează fără modificări în componentă."
          : "Stilurile scrise manual folosesc acum aceiași tokeni, deci cardul urmează tema."}
      </p>
    </section>
  );
}
