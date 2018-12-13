import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radar-form',
  templateUrl: './radar-form.component.html',
  styleUrls: ['./radar-form.component.scss']
})
export class RadarFormComponent implements OnInit {

  @Input() radarTitle;
  @Input() radarDescription;
  @Input() showErrors: boolean;
  @Output() radarTitleChange = new EventEmitter();
  @Output() radarDescriptionChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onRadarTitleChange() {
    this.radarTitleChange.emit(this.radarTitle);
  }

  onRadarDescriptionChange() {
    this.radarDescriptionChange.emit(this.radarDescription);
  }

  showRadarNameError() {
    return this.showErrors && this.radarTitle.length === 0;
  }
}
