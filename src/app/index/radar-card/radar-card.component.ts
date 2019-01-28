import { Component, OnInit, Input, Inject } from '@angular/core';
import { Radar } from 'src/model/radar';
import { RadarService } from 'src/services/radar.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-radar-card',
  templateUrl: './radar-card.component.html',
  styleUrls: ['./radar-card.component.scss']
})
export class RadarCardComponent implements OnInit {

  @Input() radar: Radar;
  radarUrl: string;

  constructor(@Inject('RadarService') private radarService: RadarService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.radarUrl = window.location.host + '/radar/' + this.radar.id + '/vote';
  }

  copyVoteRadarLink(): any {
    const elem = document.createElement('textarea');
    elem.value = this.radarUrl;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    this.toastr.success(this.radarUrl, 'Link Copiado!', {
    });
  }

  redirectToRadar() {
    this.router.navigate(['/radar/' + this.radar.id + '/results']);
  }

  closeRadar() {
    this.radarService.close(this.radar.id);
  }

}
