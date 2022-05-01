/// <reference types="node" />
import { EventEmitter } from 'stream';
export declare class GrepClass extends EventEmitter {
    private filename;
    private wordToFind;
    private grepOption;
    private argNumber;
    constructor(filename: string, wordToFind: string, grepOption: string, argNumber: number);
    getFilename(): string;
    getWordToFind(): string;
    getGrepOption(): string;
    getArgNumber(): number;
    StartFlow(): void;
    Pipe(): void;
    noPipe(): void;
}
