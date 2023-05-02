import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Beer } from '../../models/beer';
import { Brewery } from '../../models/brewery';
import { TokenStorageService } from '../../services/token-storage.service';

import { BeerService } from '../../services/beer.service';
import { BreweryService } from '../../services/brewery.service';

@Component({
  selector: 'app-edit-beer',
  templateUrl: './edit-beer.component.html',
  styleUrls: ['./edit-beer.component.css']
})
export class EditBeerComponent {

  beer?: Beer;
  newBeer?: Beer;
  breweries: Brewery[] = [];
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService,
    private brewerySrevice: BreweryService,
    private location: Location,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.getBeer();
      this.getBreweries();
    }
  }

  getBeer(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id !== 'null') {

      this.beerService.getBeer(id)
        .subscribe(beer => this.beer = beer);
    }
    else {
      this.newBeer = {
        name: '',
        breweryId: '',
        alcoholPercentage: 0,
        breweryName: '',
        image: ''
      }
    }
  }

  getBreweries(): void {
    this.brewerySrevice.getBreweries().subscribe((data) => {
      this.breweries = data;
    });
  }

  addBeer(): void {
    if (this.newBeer) {
      this.beerService.addBeer(this.newBeer).subscribe((data) => {
        this.newBeer = data;
        this.goBack();
      })
    }
  }

  updateBeer(): void {
    if (this.beer) {

      this.beerService.updateBeer(this.beer).subscribe((data) => {
        this.beer = data;
        this.goBack();
      });

    }
  }

  goBack(): void {
    this.location.back();
  }

}
