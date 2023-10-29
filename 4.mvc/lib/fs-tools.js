// read a json file
// import fs from "node:fs";
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

// read a json file 2
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
export const readJSON = (path) => require(path);
