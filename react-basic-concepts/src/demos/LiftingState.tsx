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
    <label>
      {label}
      {/* Valoarea vine de la părinte; copilul nu păstrează o copie a ei. */}
      <input
        type="number"
        value={amount}
        step={step}
        onChange={event => {
          const next = event.currentTarget.valueAsNumber;

          // Copilul cere schimbarea. Părintele decide cum actualizează starea.
          if (!Number.isNaN(next)) onChange(next);
        }}
      />
      <span> {currency}</span>
    </label>
  );
}

export function LiftingState() {
  // Singura sursă de adevăr este suma în RON.
  const [amount, setAmount] = useState(10);
  const rate = 5; // 1 RON = 5 puncte

  return (
    <section>
      <h2>Aceeași valoare, două reprezentări</h2>
      <p>Modifică oricare câmp: ambele sunt calculate din aceeași stare.</p>

      <PriceCard label="Sumă" amount={amount} currency="RON" onChange={setAmount} />
      <PriceCard
        label="Fidelitate"
        amount={amount * rate}
        currency="puncte"
        step={rate}
        onChange={next => setAmount(Math.round(next / rate))}
      />
    </section>
  );
}
