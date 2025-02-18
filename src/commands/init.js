import fs from "fs";
import path from "path";

export const init = function () {
  const quarkDir = path.join(process.cwd(), ".quark");

  if (fs.existsSync(quarkDir)) {
    console.log("Quark repo is already initialized");
    return;
  }

  fs.mkdirSync(quarkDir, { recursive: true });
  fs.mkdirSync(path.join(quarkDir, "objects"));

  const configContent = {
    repoInitialized: true,
  };

  fs.writeFileSync(
    path.join(quarkDir, "config.json"),
    JSON.stringify(configContent)
  );

  console.log("Quark initialized!!");
};