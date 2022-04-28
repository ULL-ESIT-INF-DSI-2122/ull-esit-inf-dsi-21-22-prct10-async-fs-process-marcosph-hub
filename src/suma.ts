import * as fs from 'fs';
import {spawn} from 'child_process';

export class AddProcess {
    /**
     * 
     * @param filename filename string  with the name of the file to process
     */
    constructor(private filename: string) {
        this.filename = process.argv[2]
    }
/**
 * 
 * @returns string with the name filename
 */
    getFilename(): string {
        return this.filename
    }
/**
 * 
 * @method AddingProcess() process the content of data to add every element of the file
 */
    AddingProcess() {
        /*
        fs.readFile(`${this.filename}`, function(err,data) => {
            console.log(`rading file ${filename}`);
          
            const cat = spawn('cat', [`${filename}`]);
            let catOutput = '';
            cat.stdout.on('data', (piece) => catOutput += piece);
          
            cat.on('close', () => {
              const catOutputAsArray = catOutput.split(/\s+/);
              let result = 0;
              catOutputAsArray.forEach(element => {
                result += Number(element);
              });
              console.log(`${result}`);
            });
          });
*/
        fs.readFile(`${this.filename}`, 'utf8', function(err,data) {
                const catOutputAsArray = data.split(/\s+/);
                let result = 0;
                catOutputAsArray.forEach(element => {
                  result += Number(element);
              });
              console.log(`${result}`);
        })
    }
}