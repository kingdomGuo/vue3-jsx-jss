
export default function isObject (obj: unknown): boolean {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
