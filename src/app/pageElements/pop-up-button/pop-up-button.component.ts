import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'pop-up-button',
  templateUrl: './pop-up-button.component.html',
  styleUrls: ['./pop-up-button.component.scss']
})
export class PopUpButtonComponent implements OnChanges {
  public popupClass: string;
  @Input() active: boolean;
  constructor() { 
    this.popupClass = "popup";
    console.log("A new instace was created, Pop-up button component");
  }

  ngOnChanges()
  {
    console.log("An input was changed, PopUpButtonComponent");
    if (this.active)
    {
      this.popupClass = "popup show";
      this.active = false;
    }
  }

}
