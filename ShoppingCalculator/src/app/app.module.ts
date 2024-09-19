import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { provideEnvironmentNgxCurrency, NgxCurrencyDirective, NgxCurrencyInputMode } from "ngx-currency";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { ItemnameComponent } from './itemname/itemname.component';
import { ConfirmComponent } from './confirm/confirm.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'shoppingcalculator.co.uk'
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out',
  position: 'bottom-right',
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    PrivacyComponent,
    CalculatorComponent,
    FooterComponent,
    DialogComponent,
    ItemnameComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    FlexLayoutModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxCurrencyDirective,
    NgcCookieConsentModule.forRoot(cookieConfig),
    RouterModule.forRoot([
      { path: '', component: CalculatorComponent, pathMatch: 'full' },
      { path: 'privacy', component: PrivacyComponent },
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
