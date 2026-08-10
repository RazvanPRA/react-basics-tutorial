import { useEffect, useState, type CSSProperties } from "react";

const manualCardStyle: CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "12px",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  color: "#171717",
  maxWidth: "24rem",
  padding: "24px",
  textAlign: "left"
};

const manualButtonStyle: CSSProperties = {
  backgroundColor: "#171717",
  border: 0,
  borderRadius: "8px",
  color: "#fafafa",
  cursor: "pointer",
  fontWeight: 600,
  padding: "10px 16px"
};

export function TailwindSetup() {
  const [usesTokens, setUsesTokens] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);

    return () => document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-5 pb-10 text-left">
      <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-muted p-3 text-sm text-muted-foreground">
        <span>
          Tema activă: <strong className="text-foreground">{isDark ? "dark" : "light"}</strong>
        </span>
        <button
          className="rounded-card bg-primary px-3 py-2 font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          type="button"
          onClick={() => setIsDark(current => !current)}
        >
          Comută tema
        </button>
      </div>

      <div className="inline-flex rounded-card border border-border bg-muted p-1 text-sm font-semibold">
        <button
          aria-pressed={!usesTokens}
          className={`rounded-card px-3 py-2 transition ${
            !usesTokens ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground"
          }`}
          type="button"
          onClick={() => setUsesTokens(false)}
        >
          Stiluri scrise de mână
        </button>
        <button
          aria-pressed={usesTokens}
          className={`rounded-card px-3 py-2 transition ${
            usesTokens ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground"
          }`}
          type="button"
          onClick={() => setUsesTokens(true)}
        >
          Utilitare + tokeni
        </button>
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
          <button className="rounded-card bg-primary px-4 py-2.5 font-semibold text-primary-foreground" type="button">
            Alege planul
          </button>
        </article>
      ) : (
        <article style={manualCardStyle}>
          <p style={{ color: "#737373", fontSize: "14px", fontWeight: 600, margin: "0 0 8px" }}>Plan Pro</p>
          <h2 style={{ color: "#171717", fontSize: "24px", margin: "0 0 8px" }}>Un spațiu de lucru ordonat</h2>
          <p style={{ color: "#525252", margin: "0 0 24px" }}>
            O experiență de lucru consecventă, construită din valori reutilizabile.
          </p>
          <button style={manualButtonStyle} type="button">
            Alege planul
          </button>
        </article>
      )}
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        {usesTokens
          ? "Tokenii se schimbă odată cu tema, deci cardul se adaptează fără modificări în componentă."
          : "Culorile #fafafa și #171717 sunt hardcodate, deci cardul rămâne alb în dark mode."}
      </p>
    </section>
  );
}
