import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  providers = []
  
  constructor() { }

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
