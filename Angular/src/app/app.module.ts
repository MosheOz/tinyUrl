import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { Page404Component } from './page404/page404.component';
import { MainComponent } from './main/main.component';
import { DisplayUrlComponent } from './main/display-url/display-url.component';
import { GenerateUrlComponent } from './main/generate-url/generate-url.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    Page404Component,
    MainComponent,
    DisplayUrlComponent,
    GenerateUrlComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
