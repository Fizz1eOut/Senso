export function debounce<A extends unknown[]>(
  func: (...args: A) => void,
  wait: number
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: A) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => clearTimeout(timeout);

  return debounced;
}
