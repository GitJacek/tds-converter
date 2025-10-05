import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Currency } from '../models/currency';
import { ConvertCurrencyPayload } from '../models/convert-currency-payload';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = environment.currencyApiUrl;
  private httpClient = inject(HttpClient);

  getCurrencies = (): Observable<Currency[]> =>
    this.httpClient.get(`${this.baseUrl}/currencies?type=fiat`).pipe(
      map((response: any) => this.sortCurrencies(response.response)),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );

  convert = (payload: ConvertCurrencyPayload): Observable<string> =>
    this.httpClient
      .get(
        `${this.baseUrl}/convert?from=${payload.fromCurrency!.short_code}&to=${
          payload.toCurrency!.short_code
        }&amount=${payload!.amount}`
      )
      .pipe(
        map((response: any) => response.response.value),
        catchError((error) => {
          console.error(error);
          return of('');
        })
      );

  private sortCurrencies = (currencies: Currency[]): Currency[] =>
    currencies.sort((a, b) => (a.name > b.name ? 1 : -1));
}
