import { Component, Input} from '@angular/core';
import { SetupOptions } from 'src/app/shared/models/editor-init-options';
import { EditorType } from 'src/app/shared/models/editor-type';
import { EditorFactoryService } from 'src/app/shared/services/editor-factory/editor-factory.service';

@Component({
  selector: 'editor-card',
  templateUrl: './editor-card.component.html',
  styleUrls: ['./editor-card.component.scss']
})
export class EditorCardComponent{
  public headerOptions: EditorType;
  public bodyOptions: EditorType;

  public get HeaderId(): number {
    return +this.cardId + 1000;
  }

  public get BodyId(): number {
    return +this.cardId + 100;
  }

  constructor() {
    this.headerOptions = EditorType.Title;
    this.bodyOptions = EditorType.Body;
  }

  @Input() pageName: string;
  @Input() cardId: number;
}
