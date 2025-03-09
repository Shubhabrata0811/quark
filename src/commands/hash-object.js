import fs from "fs";
import path from "path";
import zlib from "zlib";
import crypto from "crypto";

class HashObject {
  constructor(flag, files) {
    this.flag = flag;
    this.files = files;
  }

  static generateHash(blob) {
    // return crypto.createHash("blake2s256").update(blob).digest("hex");
    return crypto.createHash("sha1").update(blob).digest("hex");
  }

  static getFileBlobAndHash(file) {
    const filePath = path.resolve(file);

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `fatal: could not open '${file}' for reading: No such file or directory`
      );
    }

    // blob obj structure ---> `blob <file length>\0<file content>

    const fileContent = fs.readFileSync(filePath);
    // const fileLength = fileContent.length;
    // Get accurate byte length
    // Problem non printable characters
    const fileLength = Buffer.byteLength(fileContent);

    // const blobStr = `blob ${fileLength}\0${fileContent}`;
    // const blob = Buffer.from(blobStr);
    // Use Buffer.concat() to prevent corruption of binary files, ensuring raw data integrity.
    // Problem is non-printable characters
    // String interpolation converts buffers to strings, which alters non-text files.
    const blobStr = `blob ${fileLength}\0`;
    const blob = Buffer.concat([Buffer.from(blobStr), fileContent]);

    const hash = HashObject.generateHash(blob);

    return { blob, hash };
  }

  static writeBlobObject(blob, hash) {
    const folder = hash.slice(0, 2);
    const file = hash.slice(2);
    const folderPath = path.join(process.cwd(), ".quark", "objects", folder);

    !fs.existsSync(folderPath) && fs.mkdirSync(folderPath, { recursive: true });

    const compressedData = zlib.deflateSync(blob);
    fs.writeFileSync(path.join(folderPath, file), compressedData);
  }

  execute() {
    for (const file of this.files) {
      const { blob, hash } = HashObject.getFileBlobAndHash(file);

      if (this.flag && this.flag === "-w") {
        HashObject.writeBlobObject(blob, hash);
      }

      console.log(hash);
      // process.stdout.write(hash + "\n");
    }
  }
}

export { HashObject };
