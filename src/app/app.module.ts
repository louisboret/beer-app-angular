import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Components/nav/nav.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BeersComponent } from './Components/beers/beers.component';
import { BeerDetailComponent } from './Components/beer-detail/beer-detail.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { EditBeerComponent } from './Components/edit-beer/edit-beer.component';
import { BreweryDetailComponent } from './Components/brewery-detail/brewery-detail.component';
import { AddBreweryComponent } from './Components/add-brewery/add-brewery.component';
import { FruitBonanzaComponent } from './Components/slots/slots/fruit-bonanza/fruit-bonanza.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlotsComponent } from './Components/slots/slots/slots.component';
import { GemsBonanzaComponent } from './Components/slots/slots/gems-bonanza/gems-bonanza.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    BeersComponent,
    BeerDetailComponent,
    EditBeerComponent,
    BreweryDetailComponent,
    AddBreweryComponent,
    FruitBonanzaComponent,
    SlotsComponent,
    GemsBonanzaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
