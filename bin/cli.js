#!/usr/bin/env node

import {init} from "../src/commands/init.js";

const command = process.argv[2];

if (command === "init") {
  init();
} else {
  console.log("Unknown command");
}