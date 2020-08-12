export class validator {
    public triedToSubmitFormForTheFirstTime: boolean;
    public fileHasBeenChosen: boolean;
    public chooseHaveNotBeenPerformed: boolean;
    public openDialogWindow: boolean;
    public formatExists: boolean;
    public formatEntered: boolean;
    public selectedformatsExist: boolean;

    constructor() {
        this.formatExists = false;
        this.formatEntered = false;
        this.selectedformatsExist = false;
        this.triedToSubmitFormForTheFirstTime = false;
        this.fileHasBeenChosen = false;
        this.chooseHaveNotBeenPerformed = true;
        this.openDialogWindow = false;
    }
}