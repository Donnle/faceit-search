import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {HeaderComponent} from './layout/header/header.component';
import {LeftBarComponent} from './layout/left-bar/left-bar.component';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';
import {ButtonComponent} from './shared/components/button/button.component';
import {HubListComponent} from './shared/components/hub-list/hub-list.component';
import {HubComponent} from './shared/components/hub-list/hub/hub.component';
import {QueueComponent} from './shared/components/queue/queue.component';

// AoT requires an exported function for factories

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    LeftBarComponent,
    SettingsPageComponent,
    ButtonComponent,
    HubListComponent,
    HubComponent,
    QueueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
