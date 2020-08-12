import { Component, OnInit, Input, Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
window["$"] = $;
window["jQuery"] = $;

import { dBModel } from '../dBModel';
import { validator } from './models/validator';
import { fileMetadataRestrictions } from './models/fileMetadataRestrictions';
import { fileMetadata } from './models/fileMetadata';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
@Injectable()
export class UploadComponent implements OnInit {
  public validator: validator;
  public restrictions: fileMetadataRestrictions;
  public metaData: fileMetadata;

  public mimeTypes: any;
  public formats: string[];
  public dbData: dBModel[];
  @Output()
  public emitter = new EventEmitter();
  constructor(private http: HttpClient) {
    this.validator =  new validator();
    this.metaData = new fileMetadata();
    this.restrictions = new fileMetadataRestrictions();

    this.dbData = new Array<dBModel>();
    this.formats = new Array<string>();

    this.getMimeTypes().subscribe(data => {
      this.mimeTypes = JSON.parse(data);
      this.formats = Object.keys(this.mimeTypes);
    });
    this.getAllData();
  }

  getMimeTypes()
  {
    return this.http.get('assets/mimeTypes.json', {responseType: 'text'})  
  }

  ngOnInit(): void {
    $(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip();
      (<any>$('.collapse')).collapse({
        toggle: false
      });
    });
    
  }

  getAllData()
  {
    this.http.get('https://localhost:44376/api/files/').subscribe(data => {
      JSON.parse(data.toString()).forEach(element => {
        this.dbData.push(new dBModel(element.FileName, element.Size, element.UploadingDate,
          element.UserName, element.Format));
      });;
      this.emitter.emit("All data arivedr");
    });
  }
  requestAllData()
  {
    return this.http.get('https://localhost:44376/api/files/');
  }

  fileToUploadChanged(e: File[]){
    if(e.length > 0){
      this.metaData.selectedFile = e[0];
      this.fileSizeChanged();
    }
    this.validator.fileHasBeenChosen = e.length != 0;
    this.validator.chooseHaveNotBeenPerformed = !this.validator.fileHasBeenChosen
  }

  fileToUploadBlurred()
  {
    if(this.validator.openDialogWindow && this.validator.chooseHaveNotBeenPerformed)
        this.validator.fileHasBeenChosen = false;
    this.validator.openDialogWindow = !this.validator.openDialogWindow;
  }

  showInvalids(): void {
    this.validator.triedToSubmitFormForTheFirstTime = true;
  }

  uploadFile(): void {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let currentDate = mm + '/' + dd + '/' + yyyy;
    this.http.post('https://localhost:44376/api/files/', 
    JSON.stringify(new dBModel(this.metaData.selectedFile.name,
       this.metaData.selectedFile.size.toString(), currentDate,
       this.metaData.userName, this.metaData.selectedFile.type)),
    {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(data => {
      console.log(data);
      this.getAllData();
    }); 
  }

  fileSizeChanged()
  {
    if(this.metaData.selectedFile != null){
      if(this.metaData.selectedFile.size > this.restrictions.fileSizeRestriction &&
         this.restrictions.fileSizeRestriction > 0){
        this.resetFile();
        $(function () {
          alert("Selected file is to big. Select another on or reset file size restriction")
        });
      }
    }
  }

  fileFormatChanged(): void {  
    this.validator.formatExists = this.mimeTypes[this.metaData.enteredFileFormat] != undefined;
    this.validator.formatEntered = this.metaData.enteredFileFormat.length != 0;
  }

  resetFile(){
    this.metaData.selectedFileName = "";
    this.metaData.selectedFile = null;
    this.validator.fileHasBeenChosen = false;
    this.validator.chooseHaveNotBeenPerformed = true;
  }

  addFormat()
  {
    this.validator.selectedformatsExist = true;
    if(this.restrictions.fileFormatsRestriction_formats_array.includes(this.metaData.enteredFileFormat))
    {
      $(function () {
        alert("This file format has been already added to file formats restriction")
      });
    }
    else{
      let format = this.restrictions.fileFormatsRestriction_formats.length == 0 ? 
        this.metaData.enteredFileFormat : `, ${this.metaData.enteredFileFormat}`;
      this.restrictions.fileFormatsRestriction_formats += format;
      this.restrictions.fileFormatsRestriction_formats_array.push(format);
      let mimeType = this.restrictions.fileFormatsRestriction_mimeTypes.length == 0 ? 
        this.mimeTypes[this.metaData.enteredFileFormat] : `, ${this.mimeTypes[this.metaData.enteredFileFormat]}`;
      this.restrictions.fileFormatsRestriction_mimeTypes += mimeType;
      this.restrictions.fileFormatsRestriction_mimeTypes_array.push(mimeType);
      if(this.metaData.selectedFile.type != this.mimeTypes[this.metaData.enteredFileFormat]){
        this.resetFile();
        $(function () {
          alert("Selected file does not satisfy current file formats restriction")
        });
      }
    }
  }

  clearFileFormatsRestriction()
  {
    this.validator.selectedformatsExist = false;
    this.restrictions.fileFormatsRestriction_formats = "";
    this.restrictions.fileFormatsRestriction_formats_array = new Array<string>();
    this.restrictions.fileFormatsRestriction_mimeTypes = "";
    this.restrictions.fileFormatsRestriction_mimeTypes_array = new Array<string>();
  }
}
