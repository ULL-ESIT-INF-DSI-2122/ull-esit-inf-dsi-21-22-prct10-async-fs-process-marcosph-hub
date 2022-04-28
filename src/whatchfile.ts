import * as fs from 'fs';
import { AddProcess} from './suma'

const filename = process.argv[2]
const newaAddProcess = new AddProcess(filename);
newaAddProcess.AddingProcess();