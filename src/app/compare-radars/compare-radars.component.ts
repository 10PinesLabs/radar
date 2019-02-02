import { Component, OnInit } from '@angular/core';
import { Radar } from 'src/model/radar';
import { CompareRadarsService } from 'src/services/compare-radars.service';

@Component({
  selector: 'app-compare-radars',
  templateUrl: './compare-radars.component.html',
  styleUrls: ['./compare-radars.component.scss']
})
export class CompareRadarsComponent implements OnInit {

  title: String;
  firstRadar: Radar;
  secondRadar: Radar;

  constructor(private compareRadarsService: CompareRadarsService) { }

  ngOnInit() {
    this.compareRadarsService.firstRadar().subscribe(firstRadar => this.firstRadar = firstRadar);
    this.compareRadarsService.secondRadar().subscribe(secondRadar => this.secondRadar = secondRadar);
    this.title = 'Comparación entre '; // + this.firstRadar.title + ' y ' + this.secondRadar.title;
  }
}
