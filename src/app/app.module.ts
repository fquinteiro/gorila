import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { InvestmentsComponent } from './investments/investments.component';
import { HeaderComponent } from './generics/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    InvestmentsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
