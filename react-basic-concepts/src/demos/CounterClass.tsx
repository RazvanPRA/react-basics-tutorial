import { Component } from "react";

type CounterClassState = {
  count: number;
};

// Varianta veche, orientată pe obiecte: React păstrează starea pe instanța clasei.
export class CounterClass extends Component<{}, CounterClassState> {
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
      <section>
        <p aria-live="polite" style={{ fontSize: "3rem" }}>
          {this.state.count}
        </p>
        <button type="button" onClick={this.increment}>
          +
        </button>
        <button type="button" onClick={this.decrement}>
          −
        </button>
        <button type="button" onClick={this.reset}>
          0
        </button>
      </section>
    );
  }
}
