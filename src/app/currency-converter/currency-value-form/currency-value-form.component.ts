import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Currency } from '../../models/currency';

interface CurrencyValueForm {
  currency: FormControl<Currency>;
  value: FormControl<string>;
}

export interface CurrencyValue {
  currency: Currency;
  value: string;
}

@Component({
  selector: 'app-currency-value-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './currency-value-form.component.html',
  styleUrl: './currency-value-form.component.scss',
})
export class CurrencyValueFormComponent {
  currencies = input.required<Currency[]>();
  convertedCurrency = input<string>();
  formChanged = output<CurrencyValue>();
  form = new FormGroup<CurrencyValueForm>({
    currency: new FormControl(),
    value: new FormControl(),
  });

  constructor() {
    effect(() => {
      this.form.controls.value.setValue(this.convertedCurrency()!);
    });
    this.form.valueChanges.subscribe((value) => this.formChanged.emit(value as CurrencyValue));
  }

  numberOnly = (event: KeyboardEvent): boolean =>
    !Number.isNaN(Number(event.key)) || event.key === '.';
}
