import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radar-form',
  templateUrl: './radar-form.component.html',
  styleUrls: ['./radar-form.component.scss']
})
export class RadarFormComponent implements OnInit {

  @Input() radarTitle;
  @Input() radarDescription;

  constructor() { }

  ngOnInit() { }

}
