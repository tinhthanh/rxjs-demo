
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {share, takeUntil} from 'rxjs/operators';
import { DestroyService } from '../destroy.service';

@Component({
  selector: 'app-rxjs-share',
  templateUrl: './rxjs-share.component.html',
  styleUrls: ['./rxjs-share.component.scss'],
  providers: [DestroyService]
})
export class RxjsShareComponent  implements OnDestroy {
  sub: Subject<void> = new Subject();
  socket = new WebSockerFake("ws://someurl");
  a = "";
  b = "";
  
  constructor(private readonly $destroy: DestroyService) {
    const source = new Observable(observer => {
      this.socket.addEventListener("message", e => observer.next(e));
      return () => this.socket.close();
    }).pipe(takeUntil(this.$destroy));
    // share(),
    source.subscribe(z => {
      console.log(z);
      this.a = z + "";
    });

    source.subscribe(z => {
      console.log(z);
      this.b = z + "";  
    });    
  }
  ngOnDestroy() {
    // this.socket.close();
      // this.sub.next();
      // this.sub.complete();
  }
}

class WebSockerFake {
  constructor(url: string) {}
  interval;
  public addEventListener(ms: string, func: (value: any) => void) {
    if (ms === "message") {
      console.log("***SIDE EFFECT***");
      this.interval = setInterval(() => {
        func(Math.floor(Math.random() * 100));
      }, 3000);
    }
  }
  public close() {
    this.interval && clearInterval(this.interval);
  }
}