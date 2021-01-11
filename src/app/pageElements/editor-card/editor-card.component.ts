import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'editor-card',
  templateUrl: './editor-card.component.html',
  styleUrls: ['./editor-card.component.scss']
})
export class EditorCardComponent implements OnInit {

  constructor() { }

  @Input() title: string;

  ngOnInit(): void {
  }

}
