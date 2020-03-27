import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GamesComponent } from './components/games/games.component';
import { AuthGuard } from './guard/auth.guard';
import { GameRoomComponent } from './components/game-room/game-room.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: [AuthGuard]
  },
  {
    path: 'games',
    component: GamesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games/:gameId',
    component: GameRoomComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
