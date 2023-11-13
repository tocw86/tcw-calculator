import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { InvoiceContractorComponent } from './components/invoice-contractor/invoice-contractor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [AppComponent, HomepageComponent, InvoiceContractorComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
