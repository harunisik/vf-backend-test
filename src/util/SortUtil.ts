export function compareString(a: string, b: string, dir = "ASC") {
  const nameA = a.toUpperCase(); // ignore upper and lowercase
  const nameB = b.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return dir === "ASC" ? -1 : 1;
  }
  if (nameA > nameB) {
    return dir === "ASC" ? 1 : -1;
  }

  // names must be equal
  return 0;
}

export function compareNumber(a: number, b: number, dir = "ASC") {
  return dir === "ASC" ? a - b : b - a;
}
