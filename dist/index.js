"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberOfOccurrences_1 = require("./numberOfOccurrences");
const pipefind = new numberOfOccurrences_1.GrepClass('./textfile.txt', 'test', 'Pipe', 5);
pipefind.StartFlow();
