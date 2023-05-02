import { Injectable, OnInit } from '@angular/core';
import { Brewery } from '../models/brewery';
import { Beer } from '../models/beer';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  private baseApiUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getBreweries(): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(this.baseApiUrl + 'breweries')
      .pipe(
        catchError(this.handleError<Brewery[]>('getBreweries', []))
      );
  }

  getBrewery(id: string): Observable<Brewery> {
    return this.http.get<Brewery>(`${this.baseApiUrl}breweries/${id}`)
      .pipe(
        catchError(this.handleError<Brewery>('getBrewery'))
      );
  }

  getBeersOfBrewery(id: string): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.baseApiUrl}breweries/${id}/beers`)
      .pipe(
        catchError(this.handleError<Beer[]>('getBeers', []))
      );
  }

  addBrewery(brewery: Brewery): Observable<any> {
    return this.http.post<Brewery>(`${this.baseApiUrl}breweries`, brewery)
    .pipe(catchError(this.handleError<Brewery>(`addBrewery id=${brewery.id}`))
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
