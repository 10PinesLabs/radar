import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    this.storage.set('token', token);
    this.router.navigate(['/radars']);
  }

}
