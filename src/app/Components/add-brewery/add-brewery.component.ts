import { Component } from '@angular/core';
import { Brewery } from 'src/app/models/brewery';
import { BreweryService } from 'src/app/services/brewery.service';
import { Location } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-brewery',
  templateUrl: './add-brewery.component.html',
  styleUrls: ['./add-brewery.component.css']
})
export class AddBreweryComponent {
  newBrewery?: Brewery;
  brewery?: Brewery;
  isLoggedIn = false;

  constructor( private breweryService: BreweryService, private route: ActivatedRoute, private location: Location, private tokenService: TokenStorageService) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.getBrewery();
    }
  }

  getBrewery(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id !== 'null') {

      this.breweryService.getBrewery(id)
        .subscribe(brewery => this.brewery = brewery);
    }
    else {
      this.newBrewery = {
        name: '',
        street: '',
        city: '',
        country: ''
      }
    }
  }

  addBrewery(): void {
    if(this.newBrewery) {
      this.breweryService.addBrewery(this.newBrewery).subscribe((data) => {
        this.newBrewery = data;
        this.goBack();
      })
    }
  }

  
  goBack(): void {
    this.location.back();
  }

}
