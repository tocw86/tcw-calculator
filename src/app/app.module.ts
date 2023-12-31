import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { InvoiceContractorComponent } from './components/invoice-contractor/invoice-contractor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NipComponent } from './forms/nip/nip.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyComponent } from './forms/currency/currency.component';
import { InvoiceItemComponent } from './forms/invoice-item/invoice-item.component';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { InvoiceTotalComponent } from './components/invoice-total/invoice-total.component';
import { CurrencyPipe } from '@angular/common';
import { CurrencyFormatterDirective } from './core/directives/currency-formatter.directive';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceHeaderComponent } from './components/invoice-header/invoice-header.component';
import {
  CALCULATION_SERVICE_TOKEN,
  CalculationsService,
} from './core/services/calculations.service';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    InvoiceContractorComponent,
    NipComponent,
    CurrencyComponent,
    InvoiceItemComponent,
    InvoiceTotalComponent,
    CurrencyFormatterDirective,
    InvoiceHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
