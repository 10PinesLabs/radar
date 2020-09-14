import { Component, OnInit, Input, Inject } from '@angular/core';
import { Radar } from 'src/model/radar';
import { RadarService } from 'src/services/radar.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-radar-row',
  templateUrl: './radar-row.component.html',
  styleUrls: ['./radar-row.component.scss']
})
export class RadarRowComponent implements OnInit {

  @Input() radar: Radar;
  radarUrl: string;

  constructor(@Inject('RadarService') private radarService: RadarService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.radarUrl = window.location.host + '/radar/' + this.radar.id + '/vote';
  }

  parseRadarToRadarChart() {
    return [this.radar];
  }

  axesNames() {
    return this.radar.axes.map(axis => axis.name);
  }

  amountOfVotes(radar: any): Number {
    // This assumes all axes have the same amount of votes (which is validated in the backend)
    return radar.axes[0].answers.length || 0;
  }

  copyVoteRadarLink = (): any => {
    const elem = document.createElement('textarea');
    elem.value = this.radarUrl;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    this.toastr.success(this.radarUrl, 'Link Copiado!', {
    });
  }

  redirectToRadar = () => {
    this.router.navigate(['/radar/' + this.radar.id + '/results']);
  }

  closeRadar() {
    this.radarService.close(this.radar.id).subscribe(closedRadar =>
      this.radar = new Radar(closedRadar.id, closedRadar.name, closedRadar.description, closedRadar.axes, closedRadar.active));
  }

  copiarRadar() {
    this.router.navigate(['radar', 'create', this.radar.id]);
  }
}
