import fs from "fs";
import path from "path";

class Init {
  constructor() {}

  static createQuarkDir() {
    fs.mkdirSync(path.join(process.cwd(), ".quark"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), ".quark", "objects"), {
      recursive: true,
    });
    fs.mkdirSync(path.join(process.cwd(), ".quark", "refs"), {
      recursive: true,
    });

    fs.writeFileSync(
      path.join(process.cwd(), ".quark", "HEAD"),
      "ref: refs/heads/main\n"
    );
    console.log("Initialized quark directory!!");
  }

  execute() {
    const quarkDir = path.join(process.cwd(), ".quark");

    if (fs.existsSync(quarkDir)) {
      console.log("Quark repo is already initialized!!");
      return;
    }
    Init.createQuarkDir();
  }
}

export {
  Init
}