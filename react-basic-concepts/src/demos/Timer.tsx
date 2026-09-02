import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Demonstrație pentru useEffect și cleanup.
// De ce: randarea trebuie să rămână pură; operațiile care comunică cu exteriorul
// (timere, fetch-uri, event listeners) sunt efecte secundare și au nevoie de un
// loc în care React le poate porni și opri controlat.
// Capcană: fără cleanup, schimbarea rapidă a stării lasă intervale „zombie” în
// paralel — un memory leak. Cleanup-ul rulează înaintea re-rulării efectului și
// la unmount.

let subscriptionCount = 0;

function readOwnText(target: Element) {
  // Nu folosim textContent: pentru <body> ar include tot textul paginii, inclusiv
  // al copiilor. Ne interesează doar nodurile text aflate direct în element.
  return Array.from(target.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.textContent?.trim() ?? "")
    .filter(Boolean)
    .join(" ");
}

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // useEffect rulează DUPĂ randare: efectele nu se scriu în corpul componentei,
  // fiindcă acel corp trebuie să spună doar cum arată UI-ul pentru state-ul curent.
  useEffect(() => {
    console.log(`[timer] effect: running = ${running}`);

    if (!running) {
      console.log("[timer] nu există interval de pornit");
      return;
    }

    const id = window.setInterval(() => {
      setSeconds(currentSeconds => currentSeconds + 1);
    }, 1000);

    console.log(`[timer] interval pornit: id = ${id}`);

    // React apelează cleanup-ul înainte să ruleze din nou efectul și la unmount.
    return () => {
      console.log(`[timer] cleanup: clearInterval(${id})`);
      window.clearInterval(id);
    };
  }, [running]);

  useEffect(() => {
    const trackerId = ++subscriptionCount;

    const onBodyClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const target = event.target;
      const tag = target.tagName.toLowerCase();
      const ownText = readOwnText(target);
      // classList este sigur și pentru SVG; className nu este string pe iconițele SVG.
      const classes = Array.from(target.classList).slice(0, 3).join(" ");
      const identifier = ownText || classes || "fără text sau clase";
      const x = Math.round(event.pageX);
      const y = Math.round(event.pageY);

      // Într-o aplicație reală, aici am trimite evenimentul către analytics.
      // Handler-ul rămâne read-only față de React: fără setState, DOM, sau fetch.
      console.log(
        `[tracker #${trackerId}; active: ${subscriptionCount}] track click → <${tag}> "${identifier}" @ ${x}×${y}`
      );
    };

    document.body.addEventListener("click", onBodyClick);
    console.log(`[tracker #${trackerId}; active: ${subscriptionCount}] abonat la click-uri pe body`);

    // Intenționat NU dezabonăm încă. La pasul următor se va adăuga cleanup-ul ca
    // să se poată observa mai întâi în consolă ce lasă în urmă lipsa lui.
  }, []);

  return (
    <section>
      <p aria-live="polite" style={{ fontSize: "3rem" }}>
        {seconds} s
      </p>
      <Button onClick={() => setRunning(currentRunning => !currentRunning)}>{running ? "Pauză" : "Pornește"}</Button>
      <Button onClick={() => setSeconds(0)}>Reset</Button>
    </section>
  );
}
