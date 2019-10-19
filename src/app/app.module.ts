import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './generics/header/header.component';
import { InvestmentsComponent } from './investments/investments.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    InvestmentsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
