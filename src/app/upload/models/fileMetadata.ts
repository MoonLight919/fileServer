export class fileMetadata {
    public userName: string;
    public enteredFileFormat: string;
    public selectedFileName: string;
    public selectedFile: File | null;
    constructor() {
        this.userName = "";
        this.enteredFileFormat = "";
        this.selectedFileName = "";
        this.selectedFile = null;
    }
}