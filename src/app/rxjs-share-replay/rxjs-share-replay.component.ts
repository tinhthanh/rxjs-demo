import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, mapTo, multicast, pluck, share, shareReplay, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-share-replay',
  templateUrl: './rxjs-share-replay.component.html',
  styleUrls: ['./rxjs-share-replay.component.scss']
})
export class RxjsShareReplayComponent implements OnInit, OnDestroy {

  sub: Subject<void> = new Subject();
  constructor() {
    // chapter 1

    // this.chapter1();

    // chapter 3
    //  this.chapter3();
  }
  ngOnDestroy(): void {
    // this.sub.next();
    // this.sub.complete();

  }
  chapter1() {
    const user = new Subject<{ setting: any, id: string }>();
    const sub = user.pipe(
      // pluck('url'),
      share(),
      // shareReplay(1),
      takeUntil(this.sub)
    );

    // initial subscriber required
    // sub.pipe(map(z => z.setting),distinctUntilChanged((prev, curr) => prev.balance === curr.balance)).subscribe(console.log);
    sub.pipe(map(z => z.setting)).subscribe(console.log);

    sub.pipe(map(z => z.id)).subscribe(console.log);
     user.next({ setting: { balance: 1 }, id: '503' });
     user.next({setting: {balance: 1}, id: '504'});

    // nothing logged
     sub.subscribe(console.log);
  }

  chapter3(){
    //  multicast with standard Subject
    const source = interval(2000).pipe(take(3));
  const example = source.pipe(
    tap(() => console.log("Side Effect #1")),
    mapTo({ setting: { balance: 1 }, id: '503' })
  );
const multi: any = example.pipe(multicast(() => new Subject()));
 multi.pipe(map((z:any) => z.setting),takeUntil(this.sub)).subscribe(val => console.log(val));
 multi.pipe(map((z:any) => z.id),   takeUntil(this.sub)).subscribe(val => {console.log(val)});
//  multi.connect();
  }


  ngOnInit() {
  }

}
