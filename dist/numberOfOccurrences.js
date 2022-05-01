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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrepClass = void 0;
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const stream_1 = require("stream");
const chalk_1 = __importDefault(require("chalk"));
class GrepClass extends stream_1.EventEmitter {
    constructor(filename, wordToFind, grepOption, argNumber) {
        super();
        this.filename = filename;
        this.wordToFind = wordToFind;
        this.grepOption = grepOption;
        this.argNumber = argNumber;
    }
    getFilename() {
        return this.filename;
    }
    getWordToFind() {
        return this.wordToFind;
    }
    getGrepOption() {
        return this.grepOption;
    }
    getArgNumber() {
        return this.argNumber;
    }
    StartFlow() {
        fs.access(this.filename, fs.constants.R_OK, (err) => {
            if (this.grepOption !== 'Pipe' && this.grepOption !== 'noPipe') {
                console.error(chalk_1.default.redBright(`No match option for ${this.grepOption}. Try Pipe/noPipe`));
                this.emit('error', `No match option for the find option. Try Pipe/noPipe`);
            }
            else if (this.argNumber !== 5) {
                console.error(chalk_1.default.redBright("Insufficient number of parameters."));
                this.emit('error', `Insufficient number of parameters`);
            }
            else if (!fs.existsSync(`./${this.filename}`)) {
                console.error(chalk_1.default.redBright("Filename does not exist."));
                this.emit('error', `Filename does not exist.`);
            }
            else if (err) {
                console.error(chalk_1.default.redBright(`Cannot access to the file...try again`));
                this.emit('error', `Cannot access to the file...try again`);
            }
            else {
                if (this.grepOption === 'Pipe') {
                    this.Pipe();
                }
                else if (this.grepOption === 'noPipe') {
                    this.noPipe();
                }
                else {
                    console.error(chalk_1.default.redBright(`No match option for ${this.grepOption}. Try Pipe/noPipe`));
                    this.emit('error', `No match option for the find option. Try Pipe/noPipe`);
                }
            }
        });
    }
    Pipe() {
        const cat = (0, child_process_1.spawn)('cat', [this.filename]);
        const grep = (0, child_process_1.spawn)('grep', [this.wordToFind]);
        cat.stdout.pipe(grep.stdin);
        let catOutput = "";
        grep.stdout.on('data', (grepContent) => {
            catOutput += grepContent;
        });
        grep.on('close', () => {
            const ocurrence = catOutput.match(new RegExp(`${this.wordToFind}`, "g"));
            let result = "";
            if (ocurrence !== null) {
                result = `${this.wordToFind} aparece ${ocurrence} veces`;
                this.emit('ocurrence', result);
                return result;
            }
            else {
                result = `${this.wordToFind} no se encuentra`;
                this.emit('ocurrence', result);
                return result;
            }
        });
    }
    noPipe() {
        const cat = (0, child_process_1.spawn)("cat", [this.filename]);
        const grep = (0, child_process_1.spawn)("grep", [this.wordToFind]);
        cat.stdout.on("data", (data) => {
            grep.stdin.write(data);
        });
        cat.stdout.on("end", () => {
            grep.stdin.end();
        });
        let catOutput = "";
        grep.stdout.on("data", (data) => {
            catOutput += data;
        });
        grep.on('close', () => {
            const ocurrence = catOutput.match(new RegExp(`${this.wordToFind}`, "g"));
            let result = "";
            if (ocurrence !== null) {
                result = `${this.wordToFind} aparece ${ocurrence} veces`;
                this.emit('ocurrence', result);
                return result;
            }
            else {
                result = `${this.wordToFind} no se encuentra`;
                this.emit('ocurrence', result);
                return result;
            }
        });
    }
}
exports.GrepClass = GrepClass;
