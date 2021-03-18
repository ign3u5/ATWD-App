import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactUsComponent } from './pages/contactUs/contactUs.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { IndexComponent } from './pages/index/index.component';
import { ServicesComponent } from './pages/services/services.component';
import { AdminGuard } from './shared/guard/admin-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: IndexComponent },
  { path: 'aboutUs', component: AboutUsComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'gallery', component: GalleryComponent},
  { path: 'contactUs', component: ContactUsComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
