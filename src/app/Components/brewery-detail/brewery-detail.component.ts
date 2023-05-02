import { Component } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';
import { BreweryService } from 'src/app/services/brewery.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Brewery } from 'src/app/models/brewery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brewery-detail',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.css']
})
export class BreweryDetailComponent {
  beers: Beer[] = [];
  brewery?: Brewery;

  constructor(private breweryService: BreweryService, private beerService: BeerService, private route: ActivatedRoute, private tokenService: TokenStorageService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() !== null) {
      this.getBrewery();
      this.getBeers();

    }
    else {
      this.router.navigate(['login']);
    }
  }

  getBrewery(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.breweryService.getBrewery(id).subscribe(brewery => this.brewery = brewery);
  }

  getBeers(): void {
    
    const id = String(this.route.snapshot.paramMap.get('id'));
      this.breweryService.getBeersOfBrewery(id).subscribe((data) => {
        this.beers = data;
      });
  }
}
