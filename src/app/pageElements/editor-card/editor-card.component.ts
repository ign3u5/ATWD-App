import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { CMSStorageService } from 'src/app/shared/cms/cmsStorageService';
import { InitOptions } from 'src/app/shared/models/editor-init-options';
import { EditorFactoryService } from 'src/app/shared/services/editor-factory/editor-factory.service';

@Component({
  selector: 'editor-card',
  templateUrl: './editor-card.component.html',
  styleUrls: ['./editor-card.component.scss']
})
export class EditorCardComponent implements OnChanges, AfterViewInit {
  public isEditable: boolean;
  public headerOptions: InitOptions;
  public headerContent: string;
  public bodyOptions: InitOptions;
  public bodyContent: string;

  public get HeaderId(): number {
    return +this.cardId + 1000;
  }

  public get BodyId(): number {
    return +this.cardId + 100;
  }

  constructor(private cmsService: CMSStorageService, private editorFactory: EditorFactoryService) {
    this.headerOptions = editorFactory.headerOptions;
    this.bodyOptions = editorFactory.bodyOptions
    this.isEditable = true;
  }

  @Input() pageName: string;
  @Input() cardId: number;

  ngAfterViewInit()
  {
    if (this.cmsService.pageData[this.pageName])
    {
        this.headerContent = this.cmsService.pageData[this.pageName][this.HeaderId];
        this.bodyContent = this.cmsService.pageData[this.pageName][this.BodyId];
    }
    else if(this.pageName)
    {
        console.error(`Failed to load page data from memory in editor component. Check that content for ${this.HeaderId} and ${this.BodyId} is being set in ${this.pageName} component`);
    }
  }

  ngOnChanges()
  {
      if (this.cmsService.pageData[this.pageName])
      {
          this.headerContent = this.cmsService.pageData[this.pageName][this.HeaderId];
          this.bodyContent = this.cmsService.pageData[this.pageName][this.BodyId];
      }
      else if(this.pageName)
      {
          console.error(`Failed to load page data from memory in editor component. Check that content for ${this.HeaderId} and ${this.BodyId} is being set in ${this.pageName} component`);
      }
  }

  updateHeader(content: string)
  {
    this.headerContent = content;
    if (this.isEditable)
    {
      this.cmsService.pageData[this.pageName][this.HeaderId] = this.headerContent;
    }
  }

  updateBody(content: string)
  {
    this.bodyContent = content;
    if (this.isEditable)
    {
      this.cmsService.pageData[this.pageName][this.BodyId] = this.bodyContent;
    }
  }

}
