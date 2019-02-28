import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare-radars-buttons',
  templateUrl: './compare-radars-buttons.component.html',
  styleUrls: ['./compare-radars-buttons.component.scss']
})
export class CompareRadarsButtonsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  backToIndex() {
    this.router.navigate(['/radars']);
  }

  backToSelectToCompare() {
    this.router.navigate(['/selectToCompare']);
  }
}
