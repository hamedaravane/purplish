import {environment} from '../../environments/environment';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

export const PlatformHeaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  return next(
    req.clone({
      setHeaders: {
        'x-platform': environment.platform,
        'x-version': environment.bundleVersionCode.toString()
      }
    })
  );
};
