import type { ParseResult } from "papaparse";
import Papa from "papaparse";
import { createReadStream } from "fs";
import { join } from "path";
// import * as Culori from "culori";
import * as Culori from "culori";
import type { Lab65 } from "culori";
import type { DiffFn } from "culori/src/difference";

const parseCsv = async (filename: string): Promise<ParseResult<any>> => {
  const stream = createReadStream(filename);

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

async function main() {
  const parse: ParseResult<SoMau> = await parseCsv("./data_hung.csv");
  // mkInterface(parse);
  let data = parse.data;

  data = data.map((row) => {
    return {
      ...row,
      de2000_co: lab(
        mkLab(row["11_L_Co"], row["11_a_Co"], row["11_b_Co"]),
        mkLab(row["21_L_Co"], row["21_a_Co"], row["21_b_Co"])
      ),
      de2000_can: lab(
        mkLab(row["11_L_Can"], row["11_a_Can"], row["11_b_Can"]),
        mkLab(row["21_L_Can"], row["21_a_Can"], row["21_b_Can"])
      ),
      de2000_giua: lab(
        mkLab(row["11_L_Giua"], row["11_a_Giua"], row["11_b_Giua"]),
        mkLab(row["21_L_Giua"], row["21_a_Giua"], row["21_b_Giua"])
      ),
    };
  });

  const a = Papa.unparse(data);
  console.log(a);
}

function mkInterface(parse: ParseResult<unknown>) {
  console.log("interface SoMau {");
  console.log(parse.meta.fields?.map((name) => `  "${name}": String;`).join("\n"));
  console.log("}");
}
// https://digibug.ugr.es/bitstream/handle/10481/30827/22505830.pdf?sequence=1&isAllowed=y
function mkLab(l: number, a: number, b: number): Lab65 {
  return { l, a, b, mode: "lab65" };
}

var compare: DiffFn = Culori.differenceCiede2000();
function lab(a: Lab65, b: Lab65) {
  return compare(a, b);
}
main();
interface SoMau {
  "11_L_Co": number;
  "11_a_Co": number;
  "11_b_Co": number;
  "11_L_Giua": number;
  "11_a_Giua": number;
  "11_b_Giua": number;
  "11_L_Can": number;
  "11_a_Can": number;
  "11_b_Can": number;
  "21_L_Co": number;
  "21_a_Co": number;
  "21_b_Co": number;
  "21_L_Giua": number;
  "21_a_Giua": number;
  "21_b_Giua": number;
  "21_L_Can": number;
  "21_a_Can": number;
  "21_b_Can": number;
  de2000_co: number | null;
  de2000_giua: number | null;
  de2000_can: number | null;
}
