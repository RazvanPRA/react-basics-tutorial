import { useState } from "react";

type PriceCardProps = {
  label: string;
  amount: number;
  currency: string;
  step?: number;
  onChange: (next: number) => void;
};

function PriceCard({ label, amount, currency, step = 1, onChange }: PriceCardProps) {
  return (
    <label className="flex flex-wrap items-center gap-2 rounded-card border border-border bg-card p-4 text-card-foreground">
      <span className="font-medium">{label}</span>
      {/* Valoarea vine de la părinte; copilul nu păstrează o copie a ei. */}
      <input
        type="number"
        className="w-28 rounded-md border border-input bg-background px-3 py-2 text-foreground"
        value={amount}
        step={step}
        onChange={event => {
          const next = event.currentTarget.valueAsNumber;

          // Copilul cere schimbarea. Părintele decide cum actualizează starea.
          if (!Number.isNaN(next)) onChange(next);
        }}
      />
      <span className="text-muted-foreground">{currency}</span>
    </label>
  );
}

export function LiftingState() {
  // Singura sursă de adevăr este suma în RON.
  const [amount, setAmount] = useState(10);
  const rate = 5; // 1 RON = 5 puncte

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 text-left">
      <h2>Aceeași valoare, două reprezentări</h2>
      <p className="text-muted-foreground">Modifică oricare câmp: ambele sunt calculate din aceeași stare.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <PriceCard label="Sumă" amount={amount} currency="RON" onChange={setAmount} />
        <PriceCard
          label="Fidelitate"
          amount={amount * rate}
          currency="puncte"
          step={rate}
          onChange={next => setAmount(Math.round(next / rate))}
        />
      </div>
    </section>
  );
}
