import { Component, Input } from '@angular/core';

@Component({
	selector: 'editorc',
    templateUrl: 'editor.component.html',
    styleUrls: [
        './editor.component.scss'
    ]
})
export class EditorComponent{
    public isEditor: boolean;
    public apiKey: string;
    content: string;
    @Input() editorId: string;
    @Input() initialValue: string;
    constructor() {
        this.apiKey = "t3yjki3k9abk4gc0ghgkc0yzuxr8cgm80mefx3uh1ps0u7fd";
        this.isEditor = true;
        this.content = "<p>Hello!</p>";
    }
    public save()
    {
        console.log(this.content);
    }
 }
