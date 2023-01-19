export function isNullOrUndefined(valor: any): valor is null | undefined {
  return valor === null || valor === undefined;
}

export function isNotNullOrUndefined<T>(valor: T): valor is T {
  return !isNullOrUndefined(valor);
}

export function isEmpty<T>(valor: any): valor is null | undefined | '' {
  return isNullOrUndefined(valor) || valor === ''
}