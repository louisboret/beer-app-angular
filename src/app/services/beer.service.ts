import { Injectable, OnInit } from '@angular/core';
import { Beer } from '../models/beer';
import { MyBeer } from '../models/myBeer';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from './token-storage.service';
import { BeerUser } from '../models/beerUser';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private baseApiUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }


  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.baseApiUrl + 'beers')
      .pipe(
        catchError(this.handleError<Beer[]>('getBeers', []))
      );
  }

  getUserBeers(id: string): Observable<MyBeer[]> {
    return this.http.get<MyBeer[]>(`${this.baseApiUrl}users/${id}/beers`)
      .pipe(
        catchError(this.handleError<MyBeer[]>('getUserBeers', []))
      );
  }

  getBeer(id: string): Observable<Beer> {
    return this.http.get<Beer>(this.baseApiUrl + 'beers/' + id)
      .pipe(
        catchError(this.handleError<Beer>(`addBeer id=${id}`))
      );
  }

  addBeer(beer: Beer): Observable<any> {
    return this.http.post<Beer>(`${this.baseApiUrl}beers`, beer)
      .pipe(
        catchError(this.handleError<Beer>(`addBeer id=${beer.id}`))
      );
  }

  likeBeer(beer: Beer): Observable<any> {

    let token = this.getDecodedAccessToken();
    let userid = token.id;
    if (beer.isFavorite) {
      return this.http.delete(`${this.baseApiUrl}users/${userid}/${beer.id}`)
        .pipe(
          catchError(this.handleError('delete beeruser'))
        )
    }
    else {

      let beerUser: BeerUser = { beerId: beer.id, userId: userid, quantity: 1, rating: 5 };
      return this.http.post<BeerUser>(`${this.baseApiUrl}users/beers`, beerUser)
        .pipe(
          catchError(this.handleError<BeerUser>('add beeruser'))
        );
    }
  }

  updateBeer(beer: Beer): Observable<any> {
    return this.http.put<Beer>(this.baseApiUrl + 'beers', beer)
      .pipe(
        catchError(this.handleError<Beer>(`updateBeer id=${beer.id}`))
      );
  }


  getDecodedAccessToken(): any {
    try {
      return jwt_decode(this.tokenService.getToken());
    }
    catch (Error) {
      return null;
    }
  }

  deleteBeer(id: string | undefined) {

    return this.http.delete<Beer>(`${this.baseApiUrl}beers/${id}`).pipe(
      catchError(this.handleError<Beer>('deleteBeer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
