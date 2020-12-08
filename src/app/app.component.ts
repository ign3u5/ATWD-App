import { Component, OnInit } from '@angular/core';
import { CMSStorageService } from './shared/cms/cmsStorageService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private cmsService: CMSStorageService)
  {

  }
  ngOnInit()
  {
    this.cmsService.loadPages().subscribe(() => console.log("Pages have been loaded"));
  }
}
