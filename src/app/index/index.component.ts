import { Component, OnInit, Inject } from '@angular/core';
import { RadarService } from 'src/services/radar.service';
import { Radar } from 'src/model/radar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  radars: Radar[];

  constructor(@Inject('RadarService') private radarService: RadarService, private router: Router) { }

  ngOnInit() {
    this.radarService.radars().subscribe(radars => this.radars = radars);
  }

  redirectToRadar(radarId: any) {
    this.router.navigate(['/radar/' + radarId + '/results']);
  }

  copyVoteRadarLink(radarId): any {
    const urlToCopy = window.location.host + '/radar/' + radarId + '/vote';
    const elem = document.createElement('textarea');
    elem.value = urlToCopy;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    alert('Link:\'' + urlToCopy + '\' copiado!');
  }

  closeRadar(radarId: any) {
    this.radarService.close(radarId);
  }
}
