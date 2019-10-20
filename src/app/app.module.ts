import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './generics/header/header.component';
import { InvestmentsComponent } from './investments/investments.component';
import localeFr from '@angular/common/locales/fr';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    InvestmentsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
