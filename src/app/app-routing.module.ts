import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { ContactUsComponent } from './pages/contactUs/contactUs.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { IndexComponent } from './pages/index/index.component';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: IndexComponent },
  { path: 'aboutUs', component: AboutUsComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'gallery', component: GalleryComponent},
  { path: 'contactUs', component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
