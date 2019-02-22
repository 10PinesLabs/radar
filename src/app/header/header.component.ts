import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  LOGIN = 'Login';
  LOGOUT = 'Logout';
  isLogedIn: boolean;

  constructor(private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLogedIn = this.tokenService.isLoggedIn();
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/']);
    location.reload();
  }
}
