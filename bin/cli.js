#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { QuarkClient } from "../src/quark-client.js";
import { Init, HashObject, CatFile } from "../src/commands/commands-index.js";

const quarkClient = new QuarkClient();

const command = process.argv[2];
const commandArgs = process.argv.slice(3);

if (!command) {
  console.error("quark: no command provided.");
  process.exit(1);
}

const handleInit = () => {
  const command = new Init();
  quarkClient.run(command);
};

const handleHashObject = () => {
  let flag = commandArgs[0];
  let files = commandArgs.slice(1);

  if (!flag) return;

  if (!flag.startsWith("-")) {
    flag = null;
    files = commandArgs.slice(0);
  }

  const command = new HashObject(flag, files);
  quarkClient.run(command);
};

const handleCatFile = () => {
  if (commandArgs.length !== 2) {
    throw new Error(
      "fatal: 'cat-file' requires exactly two arguments: <flag> <object>"
    );
  }
  const flag = commandArgs[0];
  const object = commandArgs[1];

  if (!flag.startsWith("-")) {
    throw new Error(`fatal: invalid flag '${flag}'`);
  }

  const command = new CatFile(flag, object);
  quarkClient.run(command);
};

const quarkMain = (command) => {
  if (!fs.existsSync(path.resolve(".quark"))) {
    throw new Error("fatal: not a quark repository");
  }
  switch (command) {
    case "cat-file": {
      handleCatFile();
      break;
    }
    default: {
      throw new Error(`quark: '${command}' is not a quark command`);
    }
  }
};

try {
  switch (command) {
    case "init": {
      handleInit();
      break;
    }
    case "hash-object": {
      handleHashObject();
      break;
    }
    default: {
      quarkMain(command);
    }
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
