import * as path from 'path';
import * as fs from 'fs';

const DATA_BASE_DIR = path.join(__dirname, '../..');

export const Database = {
  get(key) {

    let filename = path.resolve(DATA_BASE_DIR, key);
    console.log('db::accessing::', filename);

    return new Promise( (resolve, reject) => {
      fs.readFile(filename, (error, data) => {
        if(error) {
          reject(error);
        }
        resolve(data.toString('utf-8'));
      });
    });
  }
};
