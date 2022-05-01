import 'mocha';
import { expect } from 'chai';
import { GrepClass } from '../src/numberOfOccurrences'

const pipefind = new GrepClass('/textfile.txt','test','Pipe',5)
const nopipefind = new GrepClass('../src/textfile.txt','test','noPipe',5)

describe('Ejercicio 2',() => {
  
  it ('Testing Class Operavility',() => {
    expect (pipefind instanceof GrepClass).to.be.eql (true)
  });
  it('Method getFilename()',() => {
    expect(pipefind.getFilename()).to.be.eq("/textfile.txt");
  });
  it('Method getWordToFind()',() => {
    expect(nopipefind.getWordToFind()).to.be.eq("test");
  });
  it('Method getGrepOption()',() => {
    expect(pipefind.getGrepOption()).to.be.eq("Pipe");
  });
  it('Method getArgNumber()',() => {
    expect(nopipefind.getArgNumber()).to.be.eq(5);
  });
  it ('Method Pipe()',(done) => {
    pipefind.StartFlow();
    pipefind.on('ocurrence', (message) => {
      expect(message).to.be.eql ('test aparece 4 veces');
      done();
    });
  });
  it ('Method noPipe()',(done) => {
    nopipefind.StartFlow();
    nopipefind.on('ocurrence', (message) => {
      expect(message).to.be.eql ('test aparece 4 veces');
      done();
    });
  });
});
