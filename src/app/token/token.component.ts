import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tokenService: TokenService) { }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    this.tokenService.setToken(token);
    this.router.navigate(['radars']);
  }
}
