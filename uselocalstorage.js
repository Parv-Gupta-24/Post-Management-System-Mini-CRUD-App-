import { useEffect, useState } from "react";

/**
 * A drop-in replacement for useState that persists its value to
 * localStorage under `key`, and lazily seeds itself from
 * `initialValue` (or an initializer function) the first time it runs.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch (err) {
      console.warn(`Could not read localStorage key "${key}":`, err);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Could not write localStorage key "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}