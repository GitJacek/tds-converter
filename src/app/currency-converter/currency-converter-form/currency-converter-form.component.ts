import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Currency } from '../../models/currency';
import { filter, map, pairwise, tap } from 'rxjs';
import { DecimalPipe } from '@angular/common';

export interface CurrencyConverterFormType {
  fromCurrency: FormControl<Currency>;
  fromValue: FormControl<number>;
  toCurrency: FormControl<Currency>;
  toValue: FormControl<number>;
}

export interface CurrencyConverterFormValue {
  fromCurrency?: Currency;
  fromValue?: number;
  toCurrency?: Currency;
  toValue?: number;
}

@Component({
  selector: 'app-currency-converter-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './currency-converter-form.component.html',
  styleUrl: './currency-converter-form.component.scss',
})
export class CurrencyConverterFormComponent implements OnInit {
  currencies = input.required<Currency[]>();
  convertedCurrency = input<number>();
  formChanged = output<CurrencyConverterFormValue>();
  form = new FormGroup<CurrencyConverterFormType>({
    fromCurrency: new FormControl(),
    fromValue: new FormControl(),
    toCurrency: new FormControl(),
    toValue: new FormControl(),
  });

  constructor() {
    effect(() => {
      this.form.controls.toValue.setValue(this.convertedCurrency()!);
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        pairwise(),
        filter(([previous, current]) => this.isInputChanged(previous, current)),
        map(([_, current]) => current),
        filter((value) => !!value.fromCurrency && !!value.toCurrency && !!value.fromValue)
      )
      .subscribe((value) => this.formChanged.emit(value));
  }

  private isInputChanged(
    previous: CurrencyConverterFormValue,
    current: CurrencyConverterFormValue
  ) {
    return (
      previous.fromCurrency !== current.fromCurrency ||
      previous.fromValue !== current.fromValue ||
      previous.toCurrency !== current.toCurrency
    );
  }
}
