import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  providers = []
  
  constructor(@Inject('SessionService') private session : SessionService,  private router: Router) {
      if(session.isLoggedIn()){ this.router.navigateByUrl('/radarTemplates')}
   }

  ngOnInit() { 
    this.providers = environment.logins
  }

  apiURL() {
    return environment.apiURL;
  }

  loginWith(providerName) {
    return () => window.location.href = this.providerUrl(providerName);
  }

  providerUrl(providerName){
    return `${ this.apiURL() }/auth/${providerName}/redirect`
  }
}
