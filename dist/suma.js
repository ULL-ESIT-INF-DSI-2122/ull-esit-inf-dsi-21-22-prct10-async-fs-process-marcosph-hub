"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProcess = void 0;
const fs = __importStar(require("fs"));
class AddProcess {
    /**
     *
     * @param filename filename string  with the name of the file to process
     */
    constructor(filename) {
        this.filename = filename;
        this.filename = process.argv[2];
    }
    /**
     *
     * @returns string with the name filename
     */
    getFilename() {
        return this.filename;
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
        fs.readFile(`${this.filename}`, 'utf8', function (err, data) {
            const catOutputAsArray = data.split(/\s+/);
            let result = 0;
            catOutputAsArray.forEach(element => {
                result += Number(element);
            });
            console.log(`${result}`);
        });
    }
}
exports.AddProcess = AddProcess;
