export function getProp(obj?: Record<string, string>, propName?: string) {
  if (typeof obj !== 'object') {
    return undefined;
  }

  if (propName === undefined) {
    return undefined;
  }

  return obj[propName];
}
