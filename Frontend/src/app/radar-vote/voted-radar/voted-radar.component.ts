import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voted-radar',
  templateUrl: './voted-radar.component.html',
  styleUrls: ['./voted-radar.component.scss']
})
export class VotedRadarComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() { }

  redirectToResults() {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/radar/' + id + '/results']);
  }

}
