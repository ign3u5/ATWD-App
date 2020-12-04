import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './shared/services/dataService';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './pageElements/navbar/navbar.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginFormComponent } from './pageElements/loginForm/loginForm.component';
import { EditorComponent } from './pageElements/editor/editor.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    LoginFormComponent,
    NavbarComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
