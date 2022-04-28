"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suma_1 = require("./suma");
const filename = process.argv[2];
const newaAddProcess = new suma_1.AddProcess(filename);
newaAddProcess.AddingProcess();
