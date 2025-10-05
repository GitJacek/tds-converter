import { Currency } from "./currency";

export interface ConvertCurrencyPayload {
  fromCurrency?: Currency;
  amount?: string;
  toCurrency?: Currency;
}
