import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule      
  ],
  providers: [
    UploadComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
