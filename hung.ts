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
  mkInterface(parse)
  // let data = parse.data.filter(({ stt }) => Boolean(stt));

  // data = data.map((row) => {
  //   return {
  //     ...row,
  //     de2000_13_23: lab(mkLab(row.L_13, row.a_13, row.b_13), mkLab(row.L_23, row.a_23, row.b_23)),
  //     de2000_12_22: lab(mkLab(row.L_12, row.a_12, row.b_12), mkLab(row.L_22, row.a_22, row.b_22)),
  //     de2000_11_21: lab(mkLab(row.L_11, row.a_11, row.b_11), mkLab(row.L_21, row.a_21, row.b_21)),
  //   };
  // });

  // const a = Papa.unparse(data);
  // console.log(a);
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
  stt: number | null;
  TNV: number;
  NS: number;
  "Giới tính": String;
  Khoa: String;
  Rang_13: String;
  VC_13: String;
  V3D_13: String;
  L_13: number;
  a_13: number;
  b_13: number;
  Rang_12: String;
  VC_12: String;
  V3D_12: String;
  L_12: number;
  a_12: number;
  b_12: number;
  Rang_11: String;
  VC_11: String;
  V3D_11: String;
  L_11: number;
  a_11: number;
  b_11: number;
  Rang_21: String;
  VC_21: String;
  V3D_21: String;
  L_21: number;
  a_21: number;
  b_21: number;
  Rang_22: String;
  VC_22: String;
  V3D_22: String;
  L_22: number;
  a_22: number;
  b_22: number;
  Rang_23: String;
  VC_23: String;
  V3D_23: String;
  L_23: number;
  a_23: number;
  b_23: number;
  "13_23 VC": String;
  "12_22 VC": String;
  "11_21 VC": String;
  "13_23 V3D": String;
  "12_22 V3D": String;
  "11_21 V3D": String;
  E_Nanh: String;
  E_Ben: String;
  E_Cua: String;
  "13_23<1,9": String;
  "12_22<1,9": String;
  "11_21<1,9": String;
  "13_23_VC_E": String;
  "12_22_VC_E": String;
  "11_21_VC_E": String;
  de2000_13_23: number | null;
  de2000_12_22: number | null;
  de2000_11_21: number | null;
}
