import { Component, OnInit, Inject } from '@angular/core';
import { Axis } from 'src/model/axis';
import { Radar } from 'src/model/radar';
import { RadarService } from 'src/services/radar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-radar',
  templateUrl: './create-radar.component.html',
  styleUrls: ['./create-radar.component.scss']
})
export class CreateRadarComponent implements OnInit {

  axes: Axis[] = [];
  radarTitle = '';
  radarDescription = '';
  showErrors = false;

  constructor(@Inject('RadarService') private radarService: RadarService, private router: Router) { }

  ngOnInit() { }

  radarIsInvalid(): boolean {
    return this.radarTitleIsEmpty() || this.radarAxesIsLessThanThree();
  }

  createRadar() {
    if (this.radarIsInvalid()) {
      this.showErrors = true;
    } else {
      const newRadar = new Radar(this.radarTitle, this.radarDescription, this.axes, null);
      this.radarService.createRadar(newRadar);
      this.router.navigate(['/']);
    }
  }

  private radarTitleIsEmpty(): boolean {
    return this.radarTitle.length === 0;
  }

  private radarAxesIsLessThanThree(): boolean {
    return this.axes.length < 3;
  }
}
