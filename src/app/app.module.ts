import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RadarVoteComponent } from './radar-vote/radar-vote.component';
import { AxisComponent } from './axis/axis.component';
import { environment} from '../environments/environment';
import { VotingRadarComponent } from './radar-vote/voting-radar/voting-radar.component';
import { VotedRadarComponent } from './radar-vote/voted-radar/voted-radar.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RadarVoteComponent,
    AxisComponent,
    VotingRadarComponent,
    VotedRadarComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: 'RadarService', useClass: environment.radarServiceType}],
  bootstrap: [AppComponent]
})
export class AppModule { }
