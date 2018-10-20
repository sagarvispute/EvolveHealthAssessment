import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class appInterceptor implements HttpInterceptor {
    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        //console.log(req);
        //headers: req.headers.set(‘Consumer-Secret’, ‘some sample key’)
        const dupReq = req.clone({ url: 'http://localhost:3000/' + req.url });
        return next.handle(dupReq);
    }
}