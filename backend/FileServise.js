import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

class FileServise {
  saveFile(file) {
    // console.log(file);
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('static', fileName);
      file.mv(filePath);
      // console.log(fileName);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
  deleteFile(fileName) {
    const filePath = path.join('static', fileName);
    fs.unlinkSync(filePath);
  }
}

export default new FileServise();
