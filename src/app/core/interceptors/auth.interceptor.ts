import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${environment.currencyApiKey}`),
  });
  return next(reqWithHeader);
};
