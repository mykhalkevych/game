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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GamesComponent } from './components/games/games.component';
import { GameRoomComponent } from './components/game-room/game-room.component';
import { AppState } from './store/app/app.state';
import { AuthState } from './store/auth/auth.state';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PlayersState } from './store/players/players.state';
import { CreateGameModalComponent } from './components/games/create-game-modal/create-game-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { GameState } from './store/games/games.state';
import { ChatComponent } from './components/game-room/chat/chat.component';
import { MessagesState } from './store/messages/messages.state';

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
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
