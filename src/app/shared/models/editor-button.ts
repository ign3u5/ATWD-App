export class EditorButton{
    public onAction: (buttonApi?:any) => void;
    constructor(public text: string) { 
        this.onAction = this.defaultAction;
    }
    private defaultAction()
    {
        console.log(`Button has been pressed. Default action triggered`);
    }
}