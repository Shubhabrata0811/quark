import fs from "fs";
import path from "path";
import zlib from "zlib";

class CatFile {
  constructor(flag, object) {
    this.flag = flag;
    this.object = object;
  }

  static getObjectPath(object) {
    return path.join(
      process.cwd(),
      ".quark",
      "objects",
      object.slice(0, 2),
      object.slice(2)
    );
  }

  static readObject(object) {
    const filePath = CatFile.getObjectPath(object);

    if (!fs.existsSync(filePath)) {
      throw new Error(`fatal: Not a valid object name ${object}`);
    }

    const fileContent = fs.readFileSync(filePath);
    const opBuffer = zlib.inflateSync(fileContent);

    return opBuffer;
  }

  //need to handle object's correct format, if "\x00" doesn't present
  static prettyPrint(object) {
    const opBuffer = CatFile.readObject(object);
    const output = opBuffer.toString().split("\x00")[1];
    // console.log(output);
    process.stdout.write(output);
  }

  static type(object) {
    const opBuffer = CatFile.readObject(object);
    const output = opBuffer.toString().split("\x00")[0].split(" ")[0];
    console.log(output);
    // process.stdout.write(output);
  }

  static size(object) {
    const opBuffer = CatFile.readObject(object);
    const output = opBuffer.toString().split("\x00")[0].split(" ")[1];
    console.log(output);
  }

  //need to have an output
  static exists(object) {
    const filePath = CatFile.getObjectPath(object);

    if (!fs.existsSync(filePath)) {
      process.exit(1);
    }
  }

  execute() {
    const [flag, object] = [this.flag, this.object];
    switch (flag) {
      case "-p": {
        //pretty-print <object> content
        CatFile.prettyPrint(object);
        break;
      }
      case "-t": {
        //show object type (one of 'blob', 'tree', 'commit')
        CatFile.type(object);
        break;
      }
      case "-s": {
        //show object size
        CatFile.size(object);
        break;
      }
      case "-e": {
        //check if <object> exists
        CatFile.exists(object);
        break;
      }
      default: {
        throw new Error(`error: unknown flag ${flag}`);
      }
    }
  }
}

export { CatFile };
