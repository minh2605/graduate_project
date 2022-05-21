import { useCallback } from "react";

const useLocalStorage = (
  key: string
): [
  getter: () => string | null,
  setter: (value: string) => void,
  remover: () => void
] => {
  return [
    useCallback(() => localStorage.getItem(key), [key]),
    useCallback((value) => localStorage.setItem(key, value), [key]),
    useCallback(() => localStorage.removeItem(key), [key]),
  ];
};

export default useLocalStorage;
