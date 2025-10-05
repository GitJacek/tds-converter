import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = environment.currencyApiUrl;
  private httpClient = inject(HttpClient);

  getCurrencies = (): Observable<Currency[]> =>
    this.httpClient
      .get(`${this.baseUrl}/currencies?type=fiat`)
      .pipe(map((response: any) => this.sortCurrencies(response.response)));

  convert = (fromCurrency: Currency, toCurrency: Currency, amount: number): Observable<number> =>
    this.httpClient
      .get(
        `${this.baseUrl}/convert?from=${fromCurrency.short_code}&to=${toCurrency.short_code}&amount=${amount}`
      )
      .pipe(map((response: any) => response.response.value));

  private sortCurrencies = (currencies: Currency[]): Currency[] =>
    currencies.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
}
