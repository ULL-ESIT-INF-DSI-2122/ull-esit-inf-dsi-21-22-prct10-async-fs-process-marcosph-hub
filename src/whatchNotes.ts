//import {BasicNote} from '../../p9/src/NoteClass'
import {spawn} from "child_process";
import * as fs from "fs";
import {EventEmitter} from 'stream';
import { FSWatcher } from 'fs';

export class DirectoryWatcher extends EventEmitter {
  constructor() {
    super();
  }
  watchDirectory(user: string, directory: string): FSWatcher {
    const fswatcher = fs.watch(directory);
    fswatcher.on('rename', (filename) => {
      console.log(`${filename} has been removed`);
      this.emit('rename', `The note ${filename} has been removed`);
    });
    fswatcher.on('change', (filename) => {
      console.log(`${filename} has changed`);
      this.emit('change', `${filename} has changed`);
    });
    fswatcher.on('error', (err) => {
      console.log('Cannot process the directory');
      this.emit('error', err.message);
    });
    return fswatcher;
  }
}