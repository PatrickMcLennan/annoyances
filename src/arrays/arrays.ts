export function head<T extends unknown>(array: T[]): T {
  return array[0];
}

export function tail<T extends unknown>(array: T[]): T[] {
  return array.splice(1, array.length - 1);
}
