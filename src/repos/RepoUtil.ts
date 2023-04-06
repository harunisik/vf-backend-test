import jsonfile from "jsonfile";

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb<T>(fileName: string): Promise<T> {
  return jsonfile.readFile(__dirname + "/" + fileName) as Promise<T>;
}

/**
 * Update the file.
 */
function saveDb<T>(fileName: string, db: T): Promise<void> {
  return jsonfile.writeFile(__dirname + "/" + fileName, db);
}

export default {
  openDb,
  saveDb,
} as const;
