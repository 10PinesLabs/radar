import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RadarVoteComponent } from './radar-vote/radar-vote.component';
import { ResultsComponent } from './results/results.component';
import { IndexComponent } from './index/index.component';
import { CreateRadarComponent } from './create-radar/create-radar.component';
import { SelectToCompareComponent } from './select-to-compare/select-to-compare.component';
import { CompareRadarsComponent } from './compare-radars/compare-radars.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'radars', component: IndexComponent },
  { path: 'radar/:id/vote', component: RadarVoteComponent },
  { path: 'radar/:id/results', component: ResultsComponent },
  { path: 'radar/create', component: CreateRadarComponent },
  { path: 'selectToCompare', component: SelectToCompareComponent },
  { path: 'radars/compare/:firstRadarId/:secondRadarId', component: CompareRadarsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
