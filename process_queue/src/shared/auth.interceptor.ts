import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { finalize, Observable, Subject } from 'rxjs';
let queue: {
  request: HttpRequest<any>;
  next: HttpHandlerFn;
  requestSubject: Subject<HttpEvent<any>>;
}[] = [];
let activeRequests = 0;
const maxConcurrentRequests = 3;
function processQueue(): void {
  while (activeRequests < maxConcurrentRequests && queue.length > 0) {
    const queuedItem = queue.shift();
    if (queuedItem) {
      activeRequests++;

      queuedItem
        .next(queuedItem.request)
        .pipe(
          finalize(() => {
            activeRequests--;
            processQueue();
            queuedItem.requestSubject.complete();
          })
        )
        .subscribe((event) => {
          queuedItem.requestSubject.next(event);
        });
    }
  }
}
export function interceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  let requestSubject = new Subject<HttpEvent<any>>();
  queue.push({ request: req, next, requestSubject });
  processQueue();
  return requestSubject.asObservable();
}
