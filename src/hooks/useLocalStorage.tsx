import { useState } from "react";

export default function useLocalStorage(key: string, initialValue: any) {
  const stateInitializer = () => {
    try {
      const value = localStorage.getItem(key);
      const state = value ? JSON.parse(value) : initialValue;
      return state;
    } catch (e) {
      console.error(e);
    }
  };

  const [state, setState] = useState(stateInitializer);

  const setValue = (value: unknown) => {
    try {
      const valueToStore =
        value instanceof Function ? (state: unknown) => value(state) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (e) {
      console.error(e);
    }
  };

  return [state, setValue];
}
