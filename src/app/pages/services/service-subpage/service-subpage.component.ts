import { Component, Input, OnInit } from '@angular/core';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';

@Component({
  selector: 'service-subpage',
  templateUrl: './service-subpage.component.html',
  styleUrls: ['./service-subpage.component.scss']
})
export class GraphicsDesignComponent implements OnInit {
  @Input() page: string;
  @Input() imageSrc: string;
  public pageName: string;

  constructor(private cmsService: CMSStorageService){
  }

  ngOnInit(): void {
    this.cmsService.loadPage(this.page).subscribe(pageName => this.pageName = pageName);
  }

}
