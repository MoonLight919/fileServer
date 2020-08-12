import { Component, OnInit } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import * as $ from 'jquery';
window["$"] = $;
window["jQuery"] = $;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public buff: string;
  constructor(private uploadComponent: UploadComponent) {
    this.uploadComponent.emitter.subscribe(()=>{this.createAndPopulateTables()});
  }

  ngOnInit(): void {
    
  }
  createAndPopulateTables()
  {
    this.uploadComponent.emitter.subscribe(()=>{this.createAndPopulateTables()});
    let formatsWithDublicates = [];
    this.uploadComponent.dbData.forEach((elem)=>{
      formatsWithDublicates.push(elem.format);
    });
    var uniqueFormats = new Set(formatsWithDublicates);
    var data = this.uploadComponent.dbData;
    

    $(function () {
      let arr = [];
      $('#tables').empty();
      uniqueFormats.forEach((elem)=>{
        let startTable = `<ul class="list-group">
        <li class="list-group-item active text-center">
          ${elem}
        </li>
        <table class="table table-responsive">
        <thead class="thead-dark">
          <tr>
            <th scope="col">File name</th>
            <th scope="col">Size</th>
            <th scope="col">Date of creation</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
        </table>
        </ul>`;
        $('#tables').append(startTable);
        data.forEach((e)=>{
          if(e.format == elem)
          {
            let tr = `<tr>
            <th scope="row">${e.fileName}</th>
            <td>${e.size}</td>
            <td>${e.uploadingDate}</td>
            <td>${e.userName}</td>
            </tr>`
            $('table').last().append(tr);
          }
        });
      })
    });
  }

}
