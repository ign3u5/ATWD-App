import { BoundElementProperty } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { setupTestingRouter } from '@angular/router/testing';
import { EditorButton } from '../../models/editor-button';
import { InitOptions, SetupOptions, StandardEditor } from '../../models/editor-init-options';
import { EditorType } from '../../models/editor-type';

@Injectable({
  providedIn: 'root'
})
export class EditorFactoryService {

  getSetupOptionsFromType(type: EditorType): SetupOptions{
    switch(type){
      case EditorType.Title:
        return this.getHeaderOptions();
      case EditorType.SubTitle:
        return this.getSubTitleOptions();
      case EditorType.Body:
        return this.getBodyOptions();
      case EditorType.List:
        return this.getListOptions();
      default:
        return null;
    }
  }

  getHeaderOptions(): SetupOptions{
    let headerOptions = new StandardEditor();

    headerOptions.quickbars_selection_toolbar = "bold italic";
    headerOptions.contextmenu = "undo redo | help";
    return headerOptions;
  }

  getBodyOptions(): SetupOptions{
    let bodyOptions = new StandardEditor();

    bodyOptions.quickbars_selection_toolbar = "bold italic underline | quicklink | forecolor backcolor";
    bodyOptions.contextmenu = "undo redo | inserttable | cell row column deletetable | help";
    return bodyOptions;
  }

  getListOptions(): SetupOptions{
    let bodyOptions = new StandardEditor();

    bodyOptions.quickbars_selection_toolbar = "bold italic underline | quicklink | forecolor backcolor | bullist";
    bodyOptions.contextmenu = "undo redo | inserttable | cell row column deletetable | help";
    return bodyOptions;
  }

  getSubTitleOptions(): SetupOptions{
    let headerOptions = new StandardEditor();
    headerOptions.quickbars_selection_toolbar = "bold italic underline | backcolor";
    headerOptions.contextmenu = "undo redo | help";
    return headerOptions;
  }
}
