import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  message: string;
  show: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.show = true;
    this.message = this.route.snapshot.queryParamMap.get('message');
  }


}
