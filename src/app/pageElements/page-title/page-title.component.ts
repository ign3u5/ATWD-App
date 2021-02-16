import { Component, Input, OnInit } from '@angular/core';
import { SetupOptions } from 'src/app/shared/models/editor-init-options';
import { EditorFactoryService } from 'src/app/shared/services/editor-factory/editor-factory.service';

@Component({
  selector: 'page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent{

  public titleOptions: SetupOptions;
  public subTitleOptions: SetupOptions;

  public get TitleId(): number {
    return +this.pageTitleId + 1000;
  }

  public get SubTitleId(): number {
    return +this.pageTitleId + 100;
  }

  constructor(private editorFactory: EditorFactoryService) {
    this.titleOptions = editorFactory.getHeaderOptions();
    this.subTitleOptions = editorFactory.getSubTitleOptions();
   }

  @Input() pageName: string;
  @Input() pageTitleId: number;
}
