export function convert<T, R>(t: T): R {
  return (t as unknown) as R;
}
