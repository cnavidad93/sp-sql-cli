
import { createSpinner } from "nanospinner";
import chalk from "chalk";

export const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export const lineBreak = () => console.log();

export const spinner = async (text) => {
  const id = createSpinner(chalk.grey(text)).start();
  await sleep();

  return id;
}

export const errorMsg = (title, msg) => {
  lineBreak();
  console.log(title);
  console.log(chalk.red.bold(msg));
  return process.exit(1);
}

export const formatDate = (date) => {
  if(!date) return new Date().toISOString();
  
  return date.split('/').reverse().join('-');
}