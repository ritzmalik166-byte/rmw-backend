/** Convert MongoDB documents (ObjectId, Date, etc.) into plain JSON-safe values. */
export function toPlainObject<T>(value: T): T {
  if (value === null || value === undefined) return value;
  return JSON.parse(JSON.stringify(value)) as T;
}
