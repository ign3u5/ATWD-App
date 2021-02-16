import { Injectable } from '@angular/core';
import { InitOptions } from '../../models/editor-init-options';

@Injectable({
  providedIn: 'root'
})
export class EditorFactoryService {
  headerOptions: InitOptions;
  bodyOptions: InitOptions;

  constructor() {
    this.headerOptions = new InitOptions(500, 
      false, 
      "", 
      "bold italic", 
      "undo redo | help");

    this.bodyOptions = new InitOptions(500, 
      false, 
      "quicktable image media codesample", 
      "bold italic underline | quicklink", 
      "undo redo | inserttable | cell row column deletetable | help");
  }
}
