import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RadarVoteComponent } from './radar-vote/radar-vote.component';
import { AxisComponent } from './axis/axis.component';
import { environment} from '../environments/environment';
import { VotingRadarComponent } from './radar-vote/voting-radar/voting-radar.component';
import { VotedRadarComponent } from './radar-vote/voted-radar/voted-radar.component';
import { ResultsComponent } from './results/results.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { AxisBarChartComponent } from './results/axis-bar-chart/axis-bar-chart.component';
import { AxisTableValuesComponent } from './results/axis-table-values/axis-table-values.component';
import { RadarChartComponent } from './results/radar-chart/radar-chart.component';
import { CreateRadarComponent } from './create-radar/create-radar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RadarVoteComponent,
    AxisComponent,
    VotingRadarComponent,
    VotedRadarComponent,
    ResultsComponent,
    CardContainerComponent,
    AxisBarChartComponent,
    AxisTableValuesComponent,
    RadarChartComponent,
    CreateRadarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{provide: 'RadarService', useClass: environment.radarServiceType}],
  bootstrap: [AppComponent]
})
export class AppModule { }
