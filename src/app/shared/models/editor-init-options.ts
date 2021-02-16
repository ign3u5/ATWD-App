import { EditorFactoryService } from "../services/editor-factory/editor-factory.service";
import { EditorButton } from "./editor-button";

export interface InitOptions{
    height: number;
    menubar: boolean | string;
    quickbars_insert_toolbar: string; 
    quickbars_selection_toolbar: string; 
    contextmenu: string;
    toolbar: boolean | string;
}

export interface SetupOptions extends InitOptions{
    setup: (editor: any) => void;
}

export class StandardEditor implements SetupOptions{
    customButtons: Map<string, EditorButton>;
    height: number;
    menubar: string | boolean;
    quickbars_insert_toolbar: string;
    quickbars_selection_toolbar: string;
    contextmenu: string;
    toolbar: string | boolean;
    setup: (editor: any) => void;
    constructor() {
        this.height = 500;
        this.menubar = false;
        this.quickbars_insert_toolbar = "";
        this.quickbars_selection_toolbar = "";
        this.contextmenu = "";
        this.toolbar = false;
        this.customButtons = new Map<string, EditorButton>();
        this.setup = (editor) => {
            editor.ui.registry.addButton('test', new EditorButton("Hello"))
            }
    }
}