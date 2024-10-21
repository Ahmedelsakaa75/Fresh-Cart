import { createContext, useState } from "react";

export let CounterContext = createContext();

function CounterContextProvider({ children }) {
  const [Counter, setCounter] = useState(0);

  function changeCount() {
    let min = Math.ceil(1);
    let max = Math.floor(5);
    return setCounter(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return (
    <CounterContext.Provider value={{ Counter, changeCount }}>
      {children}
    </CounterContext.Provider>
  );
}

export default CounterContextProvider;
