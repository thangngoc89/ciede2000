import type { ParseResult } from "papaparse";
import Papa from "papaparse";
import { createReadStream } from "fs";
import { join } from "path";

const parseCsv = async (filename: string): Promise<ParseResult<any>> => {
  const stream = createReadStream(join(__dirname, filename));

  return new Promise((resolve, reject) => {
    Papa.parse(stream, {
      encoding: "utf-8",
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform: (value: string): string => {
        return value.trim();
      },
      complete: (results: ParseResult<any>) => {
        return resolve(results);
      },
      error: (error) => {
        return reject(error);
      },
    });
  });
};
