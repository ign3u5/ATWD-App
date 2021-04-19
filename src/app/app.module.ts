import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './pageElements/navbar/navbar.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginFormComponent } from './pageElements/loginForm/loginForm.component';
import { EditorComponent } from './pageElements/editor/editor.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './shared/services/authenticationService';
import { StorageService } from './shared/services/storageService';
import { HttpDataService } from './shared/services/httpDataService';
import { CMSStorageService } from './shared/cms/cmsStorageService';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { ServicesComponent } from './pages/services/services.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactUsComponent } from './pages/contactUs/contactUs.component';
import { PopUpButtonComponent } from './pageElements/pop-up-button/pop-up-button.component';
import { SlideshowGalleryComponent } from './pageElements/slideshow-gallery/slideshow-gallery.component';
import { EditorCardComponent } from './pageElements/editor-card/editor-card.component';
import { PageTitleComponent } from './pageElements/page-title/page-title.component';
import { GraphicsDesignComponent } from './pages/services/service-subpage/service-subpage.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AnimatedCardComponent } from './pageElements/animated-card/animated-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    AboutUsComponent,
    ServicesComponent,
    GalleryComponent,
    ContactUsComponent,
    LoginFormComponent,
    NavbarComponent,
    EditorComponent,
    PopUpButtonComponent,
    SlideshowGalleryComponent,
    EditorCardComponent,
    PageTitleComponent,
    GraphicsDesignComponent,
    AdminComponent,
    AnimatedCardComponent
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
    HttpDataService,
    StorageService,
    AuthenticationService,
    CMSStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
