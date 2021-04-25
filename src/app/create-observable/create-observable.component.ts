import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, of , asyncScheduler} from 'rxjs';
import { auditTime, debounce, debounceTime, distinctUntilChanged, distinctUntilKeyChanged, filter, first, map, mapTo, pluck, reduce, sampleTime, scan, share, take, takeWhile, tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-create-observable',
  templateUrl: './create-observable.component.html',
  styleUrls: ['./create-observable.component.scss']
})
export class CreateObservableComponent implements OnInit {
   time = 0 ;

  debounce: any[] = [];
  normal : any [] = [];
  throttle: any [] = [];
  audit: any [] = [];
  sample: any [] = [];
  constructor() {

    // this.c1();
    // this.c2();
    // this.c3();
    // this.c4();
    // this.c5();
    // this.c6();
       this.c7();

  }
  c7() {
  // debounceTime  vs throttleTime vs auditTime vs sampleTime
  interval(1000).pipe(mapTo(1) , scan( (pre, curr) => pre+= curr , 0)).subscribe( z => this. time = z);
  const click$ = fromEvent(document, 'click');
 const source$ =  click$.pipe(
    mapTo(1),
    scan( ( pre , curr) => pre+= curr , 0),
    tap(console.log),
    map( z => {
      return   {color:"#" +  Math.floor(Math.random()*16777215).toString(16), val: z , name : this.time } }),
      share()
  );
  source$.pipe().subscribe( val => {
    this.normal.push({color : val.color, time: (val.val + 60 ) * this.normal.length ,name : this.time})
});
   source$.pipe( debounceTime(3000)).subscribe( val => {
    this.debounce.push({color : val.color, time: (val.val + 60 ) * this.debounce.length , name :this. time})
});

source$.pipe( throttleTime(3000)).subscribe( val => {
  this.throttle.push({color : val.color, time: (val.val + 60 ) * this.throttle.length , name :this. time})
});

source$.pipe( auditTime(3000)).subscribe( val => {
  this.audit.push({color : val.color, time: (val.val + 60 ) * this.audit.length, name : this.time })
});

source$.pipe( sampleTime(3000)).subscribe( val => {
  this.sample.push({color : val.color, time: (val.val + 60 ) * this.sample.length, name : this.time })
});



  // source$.pipe( 
  //    mapTo(1),
  //    scan( ( pre , curr) => pre+= curr , 0),
  //    sampleTime(5000)).subscribe( val => {
  //   console.log("call api1 sampleTime" , val)
  // })
  }
  c6() {
    // distinctUntillKeyChange vs distinctUntillChange
    const observable = new Observable<any>(subscriber => {
      subscriber.next({name: "alex" , id : 1 , balance: 10});
      subscriber.next({name: "alex" , id : 1 , balance: 10});
      subscriber.next({name: "alex" , id : 1 , balance: 100});
      subscriber.complete();
    });
    console.log("distinctUntilChanged")
    observable.pipe(distinctUntilChanged( (pre :any, curr: any) => pre.balance === curr.balance ))
    .subscribe(console.log);
    console.log("distinctUntilKeyChanged")
    observable.pipe(distinctUntilKeyChanged('balance'))
    .subscribe(console.log);
  

  }
  c5() {
    // take vs frist
   const source$ = from([1,2,4,4]);
   source$.pipe(take(1)).subscribe(console.log);
   source$.pipe(first()).subscribe(console.log);

   source$.pipe(first( (val) => val > 2)).subscribe(console.log);

   interval(1000).pipe(
    mapTo(-1),
    scan( ( pre , curr) => pre+= curr , 10),
    // filter( i => i >= 0 ),
    takeWhile( i => i >= 0)
  ).subscribe( n => console.log(n))
  }
  c4() {
// observable complete
    // from([10]).pipe(reduce((pre , curr) => pre+=curr , 10)).subscribe( (z => {
    //   console.log(z)
    // }));
    // from([10]).pipe(scan((pre , curr) => pre+=curr , 10)).subscribe( (z => {
    //   console.log(z)
    // }));
// scan vs reduce
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });
    console.log("reduce");
    observable.pipe(reduce((pre , curr) => pre+=curr , 0)).subscribe(console.log);
    console.log("scan");
    observable.pipe(scan((pre , curr) => pre+=curr , 0)).subscribe(console.log);


    const observable2 = new Observable(subscriber => {
      subscriber.next({user: 'alex' , balance: 2, online: true});
      setTimeout( k => { // web socker update
        subscriber.next({balance: 12});
        subscriber.next({balance: 0});
      }, 3000)
    });
    // updơate list
    observable2.pipe(scan((pre , curr) =>{ return {...pre, ...curr} }, {})).subscribe(console.log);
    
    // debug with tap
 

  }
  c3() {
    const source$ = fromEvent(document, 'keyup');
    source$.pipe(map( (m: KeyboardEvent) => m.key)).subscribe(console.log);
    source$.pipe(pluck('key') ).subscribe( console.log);
    
    source$.pipe(map( (m: KeyboardEvent) => m.code),
    filter( code =>  code ==='Enter' )
    ).subscribe( val => {
    console.log( 'Filter  ',val)
});

  }
  c2() {
    const observable = new Observable(subscriber => {
      let count = 0;
      const id  = setInterval( () => {
        subscriber.next(count);
        // subscriber.complete();
        count++;
      } ,1000);
      return () => {
        console.log("called");
        clearInterval(id);
      }
    });

    const observer = {
      next: value => console.log('next', value),
      error: error => console.log('erro', error),
      complete: () => console.log('complete')
    };
  const subscription =   observable.subscribe(observer);
  const subscription1 =   observable.subscribe(observer);

  subscription.add(subscription1);
  setTimeout( k => {
    subscription.unsubscribe();
    // subscription1.unsubscribe();
  }, 3000);



  }
  c1() {
    const observable = new Observable(subscriber => {
      subscriber.next('alex');
      subscriber.next('alex 1');
      subscriber.complete();
      subscriber.next('alex 2');
    });
    const observer = {
      next: value => console.log('next', value),
      error: error => console.log('erro', error),
      complete: () => console.log('complete')
    };
    observable.subscribe(observer);
  }
  ngOnInit() {
  }

}
