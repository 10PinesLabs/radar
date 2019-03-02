import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  LOGIN = 'Login';
  LOGOUT = 'Logout';
  isLoggedIn: boolean;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.isLoggedIn();
  }

  apiURL() {
    return environment.apiURL;
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/']);
    location.reload();
  }
}
