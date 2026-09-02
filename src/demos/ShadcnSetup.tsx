import { Button } from "@/components/ui/button";

const variants = ["default", "secondary", "outline", "ghost", "link"] as const;

export function ShadcnSetup() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 pb-10 text-left">
      <p className="text-center text-muted-foreground">
        Toate controalele folosesc componenta locală de UI, astfel încât dimensiunea, focusul și stările rămân
        consecvente.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="flex flex-col gap-4 rounded-card border border-border bg-card p-6 text-card-foreground shadow-sm">
          <h2>De bază</h2>
          <p className="text-muted-foreground">
            Varianta standard păstrează aceleași dimensiuni și același focus vizibil ca restul aplicației.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Buton scris de mână</Button>
            <Button className="opacity-50">Pare dezactivat</Button>
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-card border border-border bg-card p-6 text-card-foreground shadow-sm">
          <h2>shadcn/ui</h2>
          <p className="text-muted-foreground">
            Focus ring-ul, starea disabled și variantele sunt deja centralizate în componenta locală.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Buton din proiect</Button>
            <Button disabled>Dezactivat cu adevărat</Button>
          </div>
        </article>
      </div>

      <article className="flex flex-col gap-4 rounded-card border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h2>Variante tipate</h2>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map(variant => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </article>

      {/*
        shadcn/ui is not a runtime component dependency: the CLI copies Button into this
        repository. We can read and change that source without waiting for a vendor release,
        which is especially useful when collaborating with AI agents.

        cva defines typed visual variants, while Button keeps keyboard focus and disabled
        behavior in one place. cn() combines external Tailwind classes and resolves conflicts
        when a consumer intentionally overrides a default.
      */}
    </section>
  );
}
