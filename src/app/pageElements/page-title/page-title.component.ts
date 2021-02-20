import { Component, Input, OnInit } from '@angular/core';
import { SetupOptions } from 'src/app/shared/models/editor-init-options';
import { EditorType } from 'src/app/shared/models/editor-type';
import { EditorFactoryService } from 'src/app/shared/services/editor-factory/editor-factory.service';

@Component({
  selector: 'page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent{

  public titleOptionsType: EditorType;
  public subTitleOptionsType: EditorType;

  public get TitleId(): number {
    return +this.pageTitleId + 1000;
  }

  public get SubTitleId(): number {
    return +this.pageTitleId + 100;
  }

  constructor() {
    this.titleOptionsType = EditorType.Title
    this.subTitleOptionsType = EditorType.SubTitle
   }

  @Input() pageName: string;
  @Input() pageTitleId: number;
}
