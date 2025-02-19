import fs from "fs";
import path from "path";

const getStagingData = (stagingJSONPath) => {
  let stagingDataObj = { stagedFiles: [] };

  if (!fs.existsSync(stagingJSONPath)) {
    fs.writeFileSync(stagingJSONPath, JSON.stringify(stagingDataObj));
  } else {
    stagingDataObj = JSON.parse(fs.readFileSync(stagingJSONPath));
  }

  return stagingDataObj;
};

const stageFile = (filePath, stagingDataObj, stagedFiles) => {
  if (!stagingDataObj.stagedFiles.includes(filePath)) {
    stagingDataObj.stagedFiles.push(filePath);
    stagedFiles.push(filePath);
  }
};

const stageFolder = (folderPath, stagingDataObj, stagedFiles) => {
  const filesPaths = fs.readdirSync(folderPath);

  for (let filePath of filesPaths) {
    const absoluteFilePath = path.join(folderPath, filePath);

    if (absoluteFilePath === path.join(process.cwd(), ".quark")) {
      continue;
    }

    if (fs.statSync(absoluteFilePath).isDirectory()) {
      stageFolder(absoluteFilePath, stagingDataObj, stagedFiles);
    } else {
      stageFile(absoluteFilePath, stagingDataObj, stagedFiles);
    }
  }
};

export const add = function (
  filesPaths,
  currentDirPath = process.cwd(),
  stagingJSONPath = path.join(currentDirPath, ".quark/staging.json")
) {
  if (filesPaths.length === 0) {
    console.log("Nothing specified, nothing added.");
    return;
  }

  let stagingDataObj = getStagingData(stagingJSONPath);
  const stagedFiles = [];

  for (let filePath of filesPaths) {
    const absoluteFilePath = path.join(currentDirPath, filePath);

    if (!fs.existsSync(absoluteFilePath)) {
      console.log("File not present: %s ---> %s", filePath, currentDirPath);
      continue;
    }

    if (absoluteFilePath === path.join(process.cwd(), ".quark")) {
      continue;
    }

    if (fs.statSync(absoluteFilePath).isDirectory()) {
      stageFolder(absoluteFilePath, stagingDataObj, stagedFiles);
    } else {
      stageFile(absoluteFilePath, stagingDataObj, stagedFiles);
    }
  }

  fs.writeFileSync(stagingJSONPath, JSON.stringify(stagingDataObj, null, 2));

  if (stagedFiles.length > 0) {
    console.log("File(s) staged:", stagedFiles.join(", ")); //need not to show this
  }
};
