import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(() => newMode);
      setHistory((prev) => {
        //replace the last mode in history with new mode
        const newHistory = [...prev];
        newHistory.pop();
        newHistory.push(newMode);
        return newHistory;
      });
    } else {
      setMode(() => newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  };
  const back = () => {
    //pop last mode from history
    const newHistory = [...history];
    if (newHistory.length > 1) {
      //remove curr mode from history
      let prevMode = newHistory.pop();
      //set prev mode as the last mode in history
      prevMode = newHistory[newHistory.length - 1];
      setMode(prevMode);
      setHistory(newHistory);
    }
  };
  return { mode, transition, back };
}
