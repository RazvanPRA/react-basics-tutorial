import { useState } from "react";
import { Button } from "@/components/ui/button";

const RATE_INITIAL = 5;
const RATE_STEP = 0.05;
const COMISION_PCT = 0.01;
const COMISION_ID = "pure-comision";

// Este pură: pentru aceleași argumente produce întotdeauna același rezultat.
function pureConvert(ron: number, rate: number) {
  return ron / rate;
}

// Are aceeași semnătură, dar mai citește o intrare ascunsă din DOM.
// React nu este anunțat când se schimbă checkbox-ul, deci nu re-randează componenta.
function impureConvert(ron: number, rate: number) {
  const eur = ron / rate;
  const comision = document.getElementById(COMISION_ID) as HTMLInputElement | null;

  return comision?.checked ? eur * (1 - COMISION_PCT) : eur;
}

export function PureFunctions() {
  const [ron, setRon] = useState(100);
  const [rate, setRate] = useState(RATE_INITIAL);

  const pureEur = pureConvert(ron, rate);
  const impureEur = impureConvert(ron, rate);

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 text-left">
      <h2>Schimb valutar: funcții pure vs. impure</h2>

      <div className="flex flex-wrap items-center gap-3 rounded-card border border-border bg-card p-4 text-card-foreground">
        <p>
          Suma: <strong>{ron} RON</strong>
        </p>
        <Button onClick={() => setRon(current => Math.max(0, current - 10))} variant="secondary">
          −10 RON
        </Button>
        <Button onClick={() => setRon(current => current + 10)}>+10 RON</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-card border border-border bg-card p-4 text-card-foreground">
        <p>
          Curs: <strong>1 EUR = {rate.toFixed(2)} RON</strong>
        </p>
        <Button onClick={() => setRate(current => Math.max(RATE_STEP, current - RATE_STEP))} variant="secondary">
          −{RATE_STEP} RON
        </Button>
        <Button onClick={() => setRate(current => current + RATE_STEP)}>+{RATE_STEP} RON</Button>
      </div>

      <label className="flex items-center gap-2 text-muted-foreground">
        {/* Checkbox-ul este intenționat necontrolat: schimbarea lui nu schimbă state-ul React. */}
        <input className="size-4 accent-primary" id="pure-comision" type="checkbox" /> aplică comision de 1%
      </label>

      <div className="grid gap-3 rounded-card border border-primary bg-primary/10 p-4 text-card-foreground sm:grid-cols-2">
        <p>
          Conversie pură: <strong>{pureEur.toFixed(2)} EUR</strong>
        </p>
        <p>
          Conversie impură: <strong>{impureEur.toFixed(2)} EUR</strong>
        </p>
      </div>

      <p className="text-muted-foreground">
        Bifează comisionul: valoarea impură rămâne veche. Apasă apoi „+10 RON” ca să declanșezi un re-render și vei
        vedea comisionul aplicat.
      </p>

      {/*
        De ce apare bug-ul: impureConvert citește DOM-ul, o sursă de adevăr ascunsă de
        React. Bifarea nu actualizează state/props, deci React nu știe că trebuie să
        re-randeze; ecranul arată o valoare stale.

        Remediul: comisionul trebuie păstrat în state (sau primit prin props), iar o
        conversie corectă îl primește ca argument. Astfel orice schimbare anunță React.

        O funcție care citește un const de modul este tot pură dacă acel const este legat
        la un primitiv: valoarea nu se poate schimba. Dar orice valoare care se POATE
        schimba trebuie să intre ca argument / props / state. Capcană pentru Java:
        const config = { rate: 5 } nu protejează conținutul obiectului; const blochează
        doar legătura, la fel ca final.
      */}
    </section>
  );
}
