import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RadarVoteComponent } from './radar-vote/radar-vote.component';
import { ResultsComponent } from './results/results.component';
import { CreateRadarComponent } from './create-radar/create-radar.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'radar/:id/vote', component: RadarVoteComponent },
  { path: 'radar/:id/results', component: ResultsComponent },
  { path: 'radar/create', component: CreateRadarComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
