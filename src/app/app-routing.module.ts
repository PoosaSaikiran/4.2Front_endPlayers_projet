import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { MatchDetailsComponent } from './match-details/match-details.component';

const routes: Routes = [{ path: 'player-details', component: PlayerDetailsComponent },
{ path: 'match-details', component: MatchDetailsComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
