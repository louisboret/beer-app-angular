import { Component } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';
import { MyBeer } from 'src/app/models/myBeer';
import { combineLatest, mergeMap } from 'rxjs';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent {

  beers: Beer[] = [];

  
  constructor(private beerService: BeerService, private tokenService: TokenStorageService, private location: Location, private router: Router) { }
  
  ngOnInit(): void {
    if (this.tokenService.getToken() !== null) {
      this.getBeers();
    }
    else {
      this.router.navigate(['login']);
    }
  }

  likeBeer(beer: Beer): void {

  }

  getBeers(): void {
    this.beerService.getBeers().subscribe((data) => {
      this.beers = data;
    });
  }

  deleteBeer(beer: Beer) {
    this.beers = this.beers.filter(h => h !== beer);
    this.beerService.deleteBeer(beer.id).subscribe();
  }


  reloadPage() {
    window.location.reload();
  }
}
