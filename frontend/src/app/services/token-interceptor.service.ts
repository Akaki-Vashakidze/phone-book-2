import { Injectable , Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _injector:Injector) { }
  
  intercept(req:any,next:any) {
    let _authService = this._injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${_authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
} 
