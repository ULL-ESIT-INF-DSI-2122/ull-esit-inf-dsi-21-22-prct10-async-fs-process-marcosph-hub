import * as fs from 'fs';
import {spawn} from 'child_process';
import { AddProcess} from './suma'

const filename = process.argv[2]
if(fs.existsSync(`./${filename}`)) {
  fs.watch(`${filename}`, (change,filename) => {
    console.log("file was modified");
    const addprocess = spawn('node', [`../dist/whatchfile.js`,`${filename}`]);
  });
} else {
  console.log("No file detected")
}
