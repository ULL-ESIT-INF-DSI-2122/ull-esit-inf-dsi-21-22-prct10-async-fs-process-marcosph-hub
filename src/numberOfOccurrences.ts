import {spawn} from 'child_process';
import * as fs from 'fs';
import {EventEmitter} from 'stream';
import chalk from 'chalk'

export class GrepClass extends EventEmitter {
  constructor(private filename: string, private wordToFind: string, private grepOption: string, private argNumber: number){
    super();
  }

  getFilename() {
    return this.filename
  }
  getWordToFind() {
    return this.wordToFind
  }
  getGrepOption() {
    return this.grepOption
  }
  getArgNumber() {
    return this.argNumber
  }

  noPipe() {
    const cat = spawn("cat", [this.filename]);
    const grep = spawn("grep", [this.wordToFind]);

    cat.stdout.on("data", (data) => {
      grep.stdin.write(data);
    });

    cat.stdout.on("end", () => {
      grep.stdin.end();
    });

    let catOutput: string = "";
    grep.stdout.on("data", (data) => {
      catOutput += data;
    });

    grep.on('close',() => {
      const ocurrence = catOutput.match(new RegExp(`${this.wordToFind}`, "g"));
      let result: string = "";
      if(ocurrence !== null) {
        result = `${this.wordToFind} aparece ${ocurrence} veces`;
        this.emit('ocurrence',result)
        return result;
      } else {
        result = `${this.wordToFind} no se encuentra`;
        this.emit('ocurrence',result)
        return result;
      }
    });
  }

  Pipe() {
    const cat = spawn('cat', [this.filename]);
    const grep = spawn('grep', [this.wordToFind]);

    cat.stdout.pipe(grep.stdin);
    
    let catOutput = "";
    grep.stdout.on('data', (grepContent) => {
      catOutput += grepContent;
    });

    grep.on('close', () => {
      const ocurrence = catOutput.match(new RegExp(`${this.wordToFind}`, "g"));
      let result: string = "";
      if(ocurrence !== null) {
        result = `${this.wordToFind} aparece ${ocurrence} veces`;
        this.emit('ocurrence',result)
        return result;
      } else {
        result = `${this.wordToFind} no se encuentra`;
        this.emit('ocurrence',result)
        return result;
      }
    });
  }

  
  StartFlow() {
    fs.access(this.filename, fs.constants.R_OK, (err) => {
      if(this.grepOption !== 'Pipe' && this.grepOption !== 'noPipe') {
        console.error(chalk.redBright(`No match option for ${this.grepOption}. Try Pipe/noPipe`));
        this.emit('error',`No match option for the find option. Try Pipe/noPipe`);
      }
      else if (this.argNumber !== 5) {
        console.error(chalk.redBright("Insufficient number of parameters."));
        this.emit('error',`Insufficient number of parameters`);
      }
      else if(!fs.existsSync(`./${this.filename}`)) {
        console.error(chalk.redBright("Filename does not exist."));
        this.emit('error',`Filename does not exist.`);
      } else if (err) {
        console.error(chalk.redBright(`Cannot access to the file...try again`));
        this.emit('error',`Cannot access to the file...try again`);
      } else {
        if (this.grepOption === 'Pipe') {
          this.Pipe();
        } else if ( this.grepOption === 'noPipe') {
          this.noPipe();
        } else {
          console.error(chalk.redBright(`No match option for ${this.grepOption}. Try Pipe/noPipe`));
          this.emit('error',`No match option for the find option. Try Pipe/noPipe`);
        }
      }
    });
  }



 


}

