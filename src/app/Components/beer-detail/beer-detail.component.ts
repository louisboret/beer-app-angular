import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';
import { ElementRef } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MyBeer } from 'src/app/models/myBeer';
import { BeersComponent } from '../beers/beers.component';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})

export class BeerDetailComponent implements OnInit{
  @Input() beer: Beer = {alcoholPercentage: 0, breweryId:'',breweryName:'', image:'', name:'', id:'', isFavorite:false};
  @Output() reload = new EventEmitter<string>();

  thumbColor: string = 'bi bi-heart normal';

  /**
   *
   */
  constructor(private beerService: BeerService, private tokenService: TokenStorageService, private host: ElementRef<HTMLElement>) {}

  likeBeer(): void {
    console.log('here');
    this.beerService.likeBeer(this.beer).subscribe();
    this.reload.emit('reload page');
  }

  

  ngOnInit(): void {
    if(this.beer.isFavorite) {
      this.thumbColor = 'bi bi-heart-fill normal';
    }

  }


  deleteBeer() {
    this.beerService.deleteBeer(this.beer.id).subscribe();
    this.host.nativeElement.remove();
  }
}
