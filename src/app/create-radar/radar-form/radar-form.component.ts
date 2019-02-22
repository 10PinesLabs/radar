import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radar-form',
  templateUrl: './radar-form.component.html',
  styleUrls: ['./radar-form.component.scss']
})
export class RadarFormComponent implements OnInit {

  @Input() radarName;
  @Input() radarDescription;
  @Input() showErrors: boolean;
  @Output() radarNameChange = new EventEmitter();
  @Output() radarDescriptionChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onRadarNameChange() {
    this.radarNameChange.emit(this.radarName);
  }

  onRadarDescriptionChange() {
    this.radarDescriptionChange.emit(this.radarDescription);
  }

  showRadarNameError() {
    const trimmedRadarName = this.radarName.trim();
    return this.showErrors && trimmedRadarName.length === 0;
  }
}
