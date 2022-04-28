export declare class AddProcess {
    private filename;
    /**
     *
     * @param filename filename string  with the name of the file to process
     */
    constructor(filename: string);
    /**
     *
     * @returns string with the name filename
     */
    getFilename(): string;
    /**
     *
     * @method AddingProcess() process the content of data to add every element of the file
     */
    AddingProcess(): void;
}
