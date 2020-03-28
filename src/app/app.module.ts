import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GamesComponent } from './components/games/games.component';
import { GameRoomComponent } from './components/game-room/game-room.component';
import { AppState } from './store/app/app.state';
import { AuthState } from './store/auth/auth.state';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PlayersState } from './store/players/players.state';
import { CreateGameModalComponent } from './components/games/create-game-modal/create-game-modal.component';
import { GameState } from './store/games/games.state';
import { ChatComponent } from './components/game-room/chat/chat.component';
import { MessagesState } from './store/messages/messages.state';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GamesComponent,
    GameRoomComponent,
    SidebarComponent,
    CreateGameModalComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    NgxsModule.forRoot([AppState, AuthState, PlayersState, GameState, MessagesState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
