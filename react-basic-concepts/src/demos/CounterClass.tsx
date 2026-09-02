import { Component } from "react";
import { Button } from "@/components/ui/button";

type CounterClassState = {
  count: number;
};

// Varianta veche, orientată pe obiecte: React păstrează starea pe instanța clasei.
export class CounterClass extends Component<Record<string, never>, CounterClassState> {
  state: CounterClassState = { count: 0 };

  // Arrow functions păstrează automat `this` legat de instanța componentei.
  increment = () => {
    // Nu modificăm niciodată direct this.state.count. setState anunță React că starea s-a schimbat.
    this.setState(s => ({ count: s.count + 1 }));
  };

  decrement = () => {
    this.setState(s => ({ count: s.count - 1 }));
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    // Aici fluxul OOP este explicit: schimbăm state cu setState → React apelează iar render().
    // În cod nou preferăm componente funcționale + hooks: sunt mai concise și sunt stilul React modern.
    return (
      <section className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-5 text-center">
        <p aria-live="polite" className="text-5xl font-semibold text-foreground">
          {this.state.count}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button aria-label="Crește contorul" onClick={this.increment} size="icon">
            +
          </Button>
          <Button aria-label="Scade contorul" onClick={this.decrement} size="icon" variant="secondary">
            −
          </Button>
          <Button aria-label="Resetează contorul" onClick={this.reset} size="icon" variant="outline">
            0
          </Button>
        </div>
      </section>
    );
  }
}
