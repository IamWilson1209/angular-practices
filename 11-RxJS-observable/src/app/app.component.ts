import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ConnectableObservable, interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0)
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  customeObservable = new Observable((subscriber) => {
    let count = 0;
    const interval = setInterval(() => {
      //subscriber.error()
      if (count > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('emitting new value');
      subscriber.next({ message: 'New value' });
      count++;
    }, 2000)
  });

  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(`Button clicked ${this.clickCount()} times.`)
    })
  }

  ngOnInit() {
    // const sub = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val),
    // });

    // this.destroyRef.onDestroy(() => {
    //   sub.unsubscribe()
    // })

    this.customeObservable.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('complete observable'),
      error: (err) => console.log(err),
    })


    const sub = this.clickCount$.subscribe({
      next: (val) => console.log(`Button clicked ${this.clickCount()} times.`)
    });
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe()
    })
  }

  onClick() {
    this.clickCount.update(prev => prev + 1)
  }
}
