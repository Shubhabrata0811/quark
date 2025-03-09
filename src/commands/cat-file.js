class CatFile {
  constructor(flag, object) {
    this.flag = flag;
    this.object = object;
  }

  execute() {
    const [flag, object] = [this.flag, this.object];
    switch (flag) {
      case "-p": {
        //pretty-print <object> content
        break;
      }
      case "-t": {
        //show object type (one of 'blob', 'tree', 'commit')
        break;
      }
      case "-s": {
        //show object size
        break;
      }
      case "-e": {
        //check if <object> exists
        break;
      }
      default: {
        throw new Error(`error: unknown flag ${flag}`);
      }
    }
  }
}

export { CatFile };
