import { Component, OnInit, Inject } from '@angular/core';
import { Axis } from 'src/model/axis';
import { Radar } from 'src/model/radar';
import { RadarService } from 'src/services/radar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-radar',
  templateUrl: './create-radar.component.html',
  styleUrls: ['./create-radar.component.scss']
})
export class CreateRadarComponent implements OnInit {

  axes: Axis[] = [];
  radarName = '';
  radarDescription = '';
  showErrors = false;

  constructor(@Inject('RadarService') private radarService: RadarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const strId = params.get('id');
      if (strId !== null) {
        this.radarService.radar(parseInt(strId, 10)).subscribe(radarResult => {
          this.radarName = radarResult.radar.name;
          this.radarDescription = radarResult.radar.description;
          this.axes = radarResult.radar.axes.map(axis => new Axis(null, axis.name, axis.description, []));
        });
      }
    });
  }

  radarIsInvalid(): boolean {
    return this.radarNameIsEmpty() || this.radarDescriptionIsEmpty() || this.radarAxesIsLessThanThree();
  }

  createRadar() {
    if (this.radarIsInvalid()) {
      this.showErrors = true;
    } else {
      const newRadar = new Radar(null, this.radarName, this.radarDescription, this.axes, null);
      this.radarService.createRadar(newRadar).subscribe(() => this.router.navigate(['/radars']));
    }
  }

  backToIndex() {
    this.router.navigate(['/radarTemplates']);
  }

  private radarNameIsEmpty(): boolean {
    return this.radarName.length === 0;
  }

  private radarDescriptionIsEmpty(): boolean {
    return this.radarDescription.length === 0;
  }

  private radarAxesIsLessThanThree(): boolean {
    return this.axes.length < 3;
  }
}
