import { Button } from "@/components/ui/button";
import { useCounter } from "@/hooks/useCounter";
import { useWindowSize } from "@/hooks/useWindowSize";

const PRET_COPIL = 2;
const PRET_ADULT = 5;

type GrupBoxProps = {
  categorie: string;
  count: number;
  pretUnitar: number;
  subtotal: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
};

// Doar prezintă datele primite; nu are stare proprie.
function GrupBox({ categorie, count, pretUnitar, subtotal, onIncrement, onDecrement, onReset }: GrupBoxProps) {
  const esteGol = count === 0;

  return (
    <article className="flex w-full flex-col gap-3 rounded-card border border-border bg-card p-5 text-left shadow-sm">
      <h3 className="text-xl font-medium text-card-foreground">{categorie}</h3>
      <p className="text-sm text-muted-foreground">{pretUnitar} lei / persoană</p>
      <p className="text-3xl font-semibold text-card-foreground">{count} persoane</p>
      <p className="text-primary">Subtotal: {subtotal} lei</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled={esteGol} onClick={onDecrement} variant="secondary">
          −1
        </Button>
        <Button onClick={onIncrement}>+1</Button>
        <Button disabled={esteGol} onClick={onReset} variant="outline">
          Reset
        </Button>
      </div>
    </article>
  );
}

export function CustomHooks() {
  // Fiecare APEL are propria instanță de stare: +1 la copii nu modifică adulții.
  const copii = useCounter(0, 1);
  const adulti = useCounter(0, 1);
  const { width, height } = useWindowSize();

  // Sunt valori derivate la randare, nu stare duplicată care poate ieși din sincron.
  const subtotalCopii = copii.count * PRET_COPIL;
  const subtotalAdulti = adulti.count * PRET_ADULT;
  const numarTotal = copii.count + adulti.count;
  const plataTotala = subtotalCopii + subtotalAdulti;

  // Componenta rămâne subțire: logica reutilizabilă trăiește în hooks.
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-5">
      <p className="text-muted-foreground">
        Fereastră: {width} × {height}px
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <GrupBox
          categorie="Copii"
          count={copii.count}
          onDecrement={copii.decrement}
          onIncrement={copii.increment}
          onReset={copii.reset}
          pretUnitar={PRET_COPIL}
          subtotal={subtotalCopii}
        />
        <GrupBox
          categorie="Adulți"
          count={adulti.count}
          onDecrement={adulti.decrement}
          onIncrement={adulti.increment}
          onReset={adulti.reset}
          pretUnitar={PRET_ADULT}
          subtotal={subtotalAdulti}
        />
      </div>
      <div className="flex flex-col gap-2 rounded-card border border-primary bg-primary/10 p-5 text-left text-card-foreground">
        <h3 className="text-xl font-medium">Total grup</h3>
        <p>{numarTotal} persoane</p>
        <p className="text-2xl font-semibold text-primary">De plată: {plataTotala} lei</p>
      </div>
    </section>
  );
}
