import { Component, inject, signal } from '@angular/core';

import { CurrencyService } from '../currency.service';
import { debounceTime, filter, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Currency } from '../../models/currency';
import {
  CurrencyValue,
  CurrencyValueFormComponent,
} from '../currency-value-form/currency-value-form.component';
import { ConvertCurrencyPayload } from '../../models/convert-currency-payload';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-currency-converter',
  imports: [AsyncPipe, MatProgressSpinnerModule, CurrencyValueFormComponent, MatLabel],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  currencies$: Observable<Currency[]>;
  toConvertedCurrency$: Observable<string>;
  convertCurrencyPayload = signal<ConvertCurrencyPayload>({});
  private currencyService = inject(CurrencyService);

  constructor() {
    this.toConvertedCurrency$ = toObservable(this.convertCurrencyPayload).pipe(
      filter((payload: ConvertCurrencyPayload) => !!payload.fromCurrency && !!payload.toCurrency),
      debounceTime(500),
      switchMap((params: ConvertCurrencyPayload) => params.amount ? this.currencyService.convert(params) : of(''))
    );
    this.currencies$ = this.currencyService.getCurrencies();
  }

  onFromFormChange(formValue: CurrencyValue) {
    this.convertCurrencyPayload.set({
      ...this.convertCurrencyPayload(),
      fromCurrency: formValue.currency,
      amount: formValue.value,
    });

  }

  onToFormChange(formValue: CurrencyValue) {
    this.convertCurrencyPayload.set({
      ...this.convertCurrencyPayload(),
      toCurrency: formValue.currency,
    });
  }
}
