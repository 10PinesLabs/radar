import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RadarVoteComponent} from './radar-vote/radar-vote.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'radar/:id/vote', component: RadarVoteComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
