import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  LOGIN = 'Login';
  LOGOUT = 'Logout';

  button_text: string;

  constructor() { }

  ngOnInit() {
    this.button_text = this.LOGIN;
  }

  onClickLoginLogoutButton() {
    const userIsLoggedIn = this.button_text === this.LOGIN;

    if (userIsLoggedIn) {
      this.button_text = this.LOGOUT;
    } else {
      this.button_text = this.LOGIN;
    }
  }
}
