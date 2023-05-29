export function useLocalStorage(key: string, defaultState: any) {
  return JSON.parse(
    localStorage.getItem(key) ||
    JSON.stringify(defaultState)
  );
}

export function setLocalStorage(key: string, state: any) {
  localStorage.setItem(key, JSON.stringify(state));
}
