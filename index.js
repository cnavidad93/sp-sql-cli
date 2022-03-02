#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";
import inquirer from "inquirer";
import { parseCSV } from "./helpers/csvHelper.js";
import { build } from "./helpers/sqlHelper.js";
import { sleep, lineBreak, spinner } from './helpers/commonHelpers.js';


// WELCOME
figlet("SP TO SQL", (err, data) => {
  console.log(chalk.green(data));
});
await sleep();
console.log(chalk.grey(`Provide a csv file with the following structure:`));
console.log(chalk.grey.bold("(Title; Type; Date; Grade; Finality; Group)"));
lineBreak();
const { path } = await inquirer.prompt({
  name: "path",
  type: "input",
  message: "Path to your csv file",
});

// PARSING CSV
lineBreak();
const parsingSpinner = await spinner(`[Parsing CSV...]`);
const rows = await parseCSV(path);
parsingSpinner.success({ text: chalk.grey(`CSV Parsed`) });

// GENERATING SQL
const generatingSpinner = await spinner(`[Generating SQL...]`);
const SQL = build(rows);
generatingSpinner.success({ text: chalk.grey(`SQL Generated`) });

// WRITTING FILE
const writtingSpinner = await spinner(`[Writting File...]`);
fs.writeFileSync("./studyProgrammes.sql", SQL);
writtingSpinner.success({ text: chalk.grey(`File writted`) });

// FILE
lineBreak();
console.log(chalk.bgGrey(`Your file is saved as ./studyProgrammes.sql`));
