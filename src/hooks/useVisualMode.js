import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(initial, replace = false) {
    let historyArray = history

    if (replace) {
      historyArray[historyArray.length - 1] = initial
    } else {
      historyArray.push(initial);
    }

    setMode(initial)
    setHistory(historyArray) 
  }

  function back() {
    let historyArray = history

    if (historyArray.length > 1) {
      historyArray.pop()
      setHistory(historyArray)
      setMode(history[history.length - 1])
    }
  }

return { mode, transition, back };

}