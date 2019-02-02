import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Radar } from 'src/model/radar';

@Component({
  selector: 'app-select-to-compare',
  templateUrl: './select-to-compare.component.html',
  styleUrls: ['./select-to-compare.component.scss']
})
export class SelectToCompareComponent implements OnInit {

  title: String = 'Comparar Radares';
  @Input() radars: Radar[];
  @Input() firstRadar: Radar;
  @Input() secondRadar: Radar;
  @Output() firstRadarChange = new EventEmitter();
  @Output() secondRadarChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onFirstRadarChange() {
    this.firstRadarChange.emit(this.firstRadar);
  }

  onSecondRadarChange() {
    this.secondRadarChange.emit(this.secondRadar);
  }
}
