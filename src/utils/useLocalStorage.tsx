/**
 * Returns value of key in local storage
 * @param key string
 * @param defaultState any
 * @returns Object
 */
export function useLocalStorage(key: string, defaultState: any) {
  return JSON.parse(
    localStorage.getItem(key) ||
    JSON.stringify(defaultState)
  );
}

/**
 * Sets value of key in local storage
 * @param key string
 * @param state any
 */
export function setLocalStorage(key: string, state: any) {
  localStorage.setItem(key, JSON.stringify(state));
}
