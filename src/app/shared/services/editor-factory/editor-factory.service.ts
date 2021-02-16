import { BoundElementProperty } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { setupTestingRouter } from '@angular/router/testing';
import { EditorButton } from '../../models/editor-button';
import { InitOptions, SetupOptions, StandardEditor } from '../../models/editor-init-options';

@Injectable({
  providedIn: 'root'
})
export class EditorFactoryService {

  getTestButton(): EditorButton{
    return new EditorButton("Test");
  }

  getHeaderOptions(): SetupOptions{
    let headerOptions = new StandardEditor();

    headerOptions.quickbars_selection_toolbar = "bold italic";
    headerOptions.contextmenu = "undo redo | help";
    return headerOptions;
  }

  getBodyOptions(): SetupOptions{
    let bodyOptions = new StandardEditor();

    bodyOptions.quickbars_insert_toolbar = "quicktable image media codesample";
    bodyOptions.quickbars_selection_toolbar = "bold italic underline | quicklink";
    bodyOptions.contextmenu = "undo redo | inserttable | cell row column deletetable | help";
    bodyOptions.toolbar = "test";
    return bodyOptions;
  }
}
