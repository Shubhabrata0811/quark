#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { init } from "../src/commands/init.js";
import { add } from "../src/commands/add.js";

const command = process.argv[2];

const commandArgs = process.argv.slice(3);

const quarkMain = function () {
  if (command === "add") {
    if (!fs.existsSync(path.join(process.cwd(), ".quark"))) {
      console.log(
        "Not a quark repository. To initialized quark run 'quark init'."
      );
      process.exit(1);
    }
    add(commandArgs);
  } else {
    console.log("Unknown quark command: %s", command);
    process.exit(1);
  }
};

if (command === "init") {
  init();
} else {
  quarkMain();
}
