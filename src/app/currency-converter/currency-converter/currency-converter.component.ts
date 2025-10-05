import { Component, inject, OnInit } from '@angular/core';
import {
  CurrencyConverterFormComponent,
  CurrencyConverterFormValue,
} from '../currency-converter-form/currency-converter-form.component';
import { CurrencyService } from '../currency.service';
import { debounceTime, Observable, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Currency } from '../../models/currency';

@Component({
  selector: 'app-currency-converter',
  imports: [CurrencyConverterFormComponent, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent implements OnInit {
  currencies$!: Observable<Currency[]>;
  convertedCurrency$ = new Observable<number>();
  convertCurrency$ = new Subject<CurrencyConverterFormValue>();
  private currencyService = inject(CurrencyService);

  ngOnInit(): void {
    this.currencies$ = this.currencyService.getCurrencies();

    this.convertedCurrency$ = this.convertCurrency$.pipe(
      debounceTime(300),
      switchMap((params: CurrencyConverterFormValue) =>
        this.currencyService.convert(params.fromCurrency!, params.toCurrency!, params.fromValue!)
      )
    );
  }

  onFormChange(formValue: CurrencyConverterFormValue) {
    this.convertCurrency$.next(formValue);
  }
}
