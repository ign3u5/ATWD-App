import { Component, OnInit } from '@angular/core';
import { CMSStorageService } from './shared/cms/cmsStorageService';
import { TokenServiceService } from './shared/services/token-service/token-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

}
