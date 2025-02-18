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
  const stagingContent = {
    stagedFiles: [],
  };

  fs.writeFileSync(
    path.join(quarkDir, "config.json"),
    JSON.stringify(configContent)
  );

  fs.writeFileSync(
    path.join(quarkDir, "staging.json"),
    JSON.stringify(stagingContent)
  );

  console.log("Quark initialized!!");
};
