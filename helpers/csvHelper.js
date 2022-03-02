import chalk from "chalk";
import csv from "csv-parser";
import fs from "fs";
import { CSV_OPTIONS } from "../constants/constants.js";
import { errorMsg } from "./commonHelpers.js";

const validate = (data) => {
  const valid = CSV_OPTIONS.HEADERS.reduce(
    (prev, header) => prev && data[header],
    true
  );

  if (valid) return true;
  throw Error("Invalid CSV format");
};

const readFile = (path) => {
  return new Promise((resolve) => {
    const rows = [];

    fs.createReadStream(path)
      .on("error", (error) => {
        errorMsg(`[Error opening CSV]`, `File not found: ${error.path}`);
      })
      .pipe(
        csv({ separator: CSV_OPTIONS.SEPARATOR, headers: CSV_OPTIONS.HEADERS })
      )
      .on("data", (data) => {
        try {
          validate(data);
          rows.push(data);
        } catch (error) {
          errorMsg(`[Error parsing CSV]`, error);
        }
      })
      .on("end", () => resolve(rows));
  });
};

export const parseCSV = async (path) => {
  const rows = await readFile(path);

  return rows;
};
