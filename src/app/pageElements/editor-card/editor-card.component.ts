import { Component, Input} from '@angular/core';
import { SetupOptions } from 'src/app/shared/models/editor-init-options';
import { EditorFactoryService } from 'src/app/shared/services/editor-factory/editor-factory.service';

@Component({
  selector: 'editor-card',
  templateUrl: './editor-card.component.html',
  styleUrls: ['./editor-card.component.scss']
})
export class EditorCardComponent{
  public headerOptions: SetupOptions;
  public bodyOptions: SetupOptions;

  public get HeaderId(): number {
    return +this.cardId + 1000;
  }

  public get BodyId(): number {
    return +this.cardId + 100;
  }

  constructor(private editorFactory: EditorFactoryService) {
    this.headerOptions = editorFactory.getHeaderOptions();
    this.bodyOptions = editorFactory.getBodyOptions();
  }

  @Input() pageName: string;
  @Input() cardId: number;
}
