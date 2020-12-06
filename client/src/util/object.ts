export function removeNilProps(object: any) {
  for (const key of Object.keys(object)) {
    if (isNil(object[key])) {
      delete object[key];
    }
  }

  return object;
}

export function isNil(object: any) {
  return object === undefined || object === null;
}

export function getProp(obj?: Record<string, string>, propName?: string) {
  if (typeof obj !== 'object') {
    return undefined;
  }

  if (propName === undefined) {
    return undefined;
  }

  return obj[propName];
}
