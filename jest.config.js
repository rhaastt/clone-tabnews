const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

console.log(dotenv.config());

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
