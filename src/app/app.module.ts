import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HamiltonComponent } from './pages/watches/hamilton/hamilton.component';
import { RolexSubmarinerComponent } from './pages/watches/rolex-submariner/rolex-submariner.component';
import { IconsComponent } from './components/icons/icons.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
