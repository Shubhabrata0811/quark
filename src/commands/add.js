import fs from "fs";
import path from "path";

export const add = function (filePaths) {
  if (filePaths.length === 0) {
    console.log("Nothing specified, nothing added.");
    return;
  }

  const currentDirPath = process.cwd();
  const stagingJSONPath = path.join(currentDirPath, ".quark/staging.json");
  let stagingDataObj = { stagedFiles: [] };
  const stagedFiles = [];

  if (!fs.existsSync(stagingJSONPath)) {
    fs.writeFileSync(stagingJSONPath, JSON.stringify(stagingDataObj));
  } else {
    stagingDataObj = JSON.parse(fs.readFileSync(stagingJSONPath));
  }

  for (let filePath of filePaths) {
    const absoluteFilePath = path.join(currentDirPath, filePath);
    if (!fs.existsSync(absoluteFilePath)) {
      console.log("File not present: %s", filePath);
      continue;
    }

    if (!stagingDataObj.stagedFiles.includes(absoluteFilePath)) {
      stagingDataObj.stagedFiles.push(absoluteFilePath);
    }
    stagedFiles.includes(filePath) || stagedFiles.push(filePath);
  }

  fs.writeFileSync(
    path.join(currentDirPath, ".quark/staging.json"),
    JSON.stringify(stagingDataObj, null, 2)
  );

  console.log("File staged: " + stagedFiles.join(", "));
};
