export class fileMetadataRestrictions {
    public fileSizeRestriction: number;
    public fileFormatsRestriction_formats: string;
    public fileFormatsRestriction_formats_array: string[];
    public fileFormatsRestriction_mimeTypes: string; 
    public fileFormatsRestriction_mimeTypes_array: string[];
    public selectedFormats: string[];
    constructor() {
        this.fileSizeRestriction = 0;
        this.fileFormatsRestriction_formats = "";
        this.fileFormatsRestriction_mimeTypes = "";
        this.fileFormatsRestriction_formats_array = new Array<string>();
        this.fileFormatsRestriction_mimeTypes_array = new Array<string>();
    }
}