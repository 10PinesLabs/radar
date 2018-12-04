import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RadarVoteComponent } from './radar-vote/radar-vote.component';
import { AxisComponent } from './axis/axis.component';
import { environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RadarVoteComponent,
    AxisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: 'RadarService', useClass: environment.radarServiceType}],
  bootstrap: [AppComponent]
})
export class AppModule { }
