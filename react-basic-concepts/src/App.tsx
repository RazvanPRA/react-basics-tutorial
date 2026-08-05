import { CounterClass } from "./demos/CounterClass";
import { PrettierFormat } from "./demos/PrettierFormat";
import { PureFunctions } from "./demos/PureFunctions";
import "./App.css";

function TestButton(props: { width?: number; title?: string }) {
  return <button style={{ width: props.width ?? "auto", padding: "8px", margin: 5 }}>{props.title}</button>;
}

function App() {
  const b1 = TestButton({ width: 150, title: "Button fn call" });
  console.log("b1", b1);

  return (
    <>
      <CounterClass />
      <PureFunctions />
      <PrettierFormat />
    </>
  );
}

export default App;
