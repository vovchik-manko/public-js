function getRandomKey(keys: string[]): string {
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

function generateKeys(size: number): string[] {
  return Array.from(new Array(size), (_, index) => `key-${Date.now() + index}`);
}

export function generateUsers(usersSize: number = 5, keysSize: number = 3): {key: string, id: number}[] {
  const keys = generateKeys(keysSize);

  return Array.from(new Array(usersSize), (_, index) => ({
    key: getRandomKey(keys),
    id: index + 1,
  }));
}