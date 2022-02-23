import { useState } from "react";
// this hook manages the transition state of components using a stack structure
export function useVisualMode(initial) {
  // mode is current state component is in
  const [mode, setMode] = useState(initial);
  // history is a stack holding prev and current modes
  const [history, setHistory] = useState([initial]);
  // add mode to into stack to keep track of state (replace arg. used to jump back two times, i.e form confirm -> form edit)
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
  // go back to prev state (delete mode from stack)
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
