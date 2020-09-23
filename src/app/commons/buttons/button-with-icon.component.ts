import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  templateUrl: './button-with-icon.component.html',
  styleUrls: ['./button-with-icon.component.scss']
})
export class ButtonWithIconComponent implements OnInit {

  @Input() label: String;
  @Input() onClick: () => {};
  @Input() iconClass: String;
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'light' | 'dark';
  @Input() isOutlined : Boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  mapTypeToClass() {
    const selector = this.isOutlined ? "btn-outline-" :  'btn-'
    return selector + this.type;
  }

}
