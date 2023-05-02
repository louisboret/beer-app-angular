import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { BeersComponent } from './Components/beers/beers.component';
import { BeerDetailComponent } from './Components/beer-detail/beer-detail.component';
import { EditBeerComponent } from './Components/edit-beer/edit-beer.component';
import { BreweryDetailComponent } from './Components/brewery-detail/brewery-detail.component';
import { AddBreweryComponent } from './Components/add-brewery/add-brewery.component';
import { FruitBonanzaComponent } from './Components/slots/slots/fruit-bonanza/fruit-bonanza.component';
import { SlotsComponent } from './Components/slots/slots/slots.component';
import { GemsBonanzaComponent } from './Components/slots/slots/gems-bonanza/gems-bonanza.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'beer/:id', component: BeerDetailComponent },
  { path: 'beers', component: BeersComponent },
  { path: 'edit-beer/:id', component: EditBeerComponent },
  { path: 'edit-beer', component: EditBeerComponent},
  { path: 'brewery-detail/:id', component: BreweryDetailComponent},
  { path: 'add-brewery', component: AddBreweryComponent},
  { path: 'add-brewery/:id', component: AddBreweryComponent},
  { path: 'slots', component: SlotsComponent},
  { path: 'slots/fruit-bonanza', component: FruitBonanzaComponent},
  { path: 'slots/gems-bonanza', component: GemsBonanzaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
