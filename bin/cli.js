#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { QuarkClient } from "../src/quark-client.js";
import { Init } from "../src/commands/commands-index.js";

const quarkClient = new QuarkClient();

const command = process.argv[2];
const commandArgs = process.argv.slice(3);

const handelInit = () => {
  const command = new Init();
  quarkClient.run(command);
};

const quarkMain = function () {
};

switch (command) {
  case "init": {
    handelInit();
    break;
  }
  default: {
    quarkMain();
  }
}
