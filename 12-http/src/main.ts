import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';

function loggingIntercepter(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING')
  // })
  console.log("outgoing request")
  console.log(request);
  return next(request).pipe(
    /* 接收response後可以用tap處理 */
    tap({
      next: event => {
        if (event.type === HttpEventType.Response) {
          console.log('Incoming response');
          console.log(event.status);
          console.log(event.body)
        }
      }
    })
  );
}

bootstrapApplication(AppComponent,
  {
    providers: [provideHttpClient(
      withInterceptors([loggingIntercepter])
    )]
  }
).catch((err) => console.error(err));
