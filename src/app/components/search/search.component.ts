import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from, interval, Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap , catchError,map, first, delay, takeWhile, filter } from 'rxjs/operators';
import { of, timer } from  'rxjs';

@Component({
  selector: 'app-search',
  template: `
  <div>
    Search <input (input)="search($event.target.value)" />
    <div *ngFor="let word of (searchWords$ | async)">
      {{ word }}
    </div>
  </div>
`
})
export class SearchComponent  {
public searchWords$: Observable<string[]>;

private search$ = new Subject<string>();

constructor(private httpClient: HttpClient) {
//distinctUntilChanged
 const temp  = from([1,1,2,3,4]);

  //  const temp  = interval(500).pipe(switchMap(z => of(new Date().getSeconds())));
  // temp.pipe(distinctUntilChanged()).subscribe( z => {
  //   console.log(z);
  // });
  const source$ = of(2,3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);
  
  // source$
  // .pipe(filter(it => it === 3))
  // .subscribe(val => console.log('filter', val));

  source$
  .pipe(takeWhile(val => val <= 3 , true))
  .subscribe(console.log);
// source$
//   .pipe(takeWhile(it => it === 3))
//   .subscribe(val => console.log('takeWhile', val));
}

public ngOnInit() {
  this.searchWords$ = this.search$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(text => text
      ? this.loadWords(text)
      : of([])),
    catchError(() => of([]))
  )
   ;
}

public search(text: string): void {
  this.search$.next(text);
}

private loadWords(text: string): Observable<string[]> {
  console.log("call -> api")
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${text}&limit=100&namespace=0&format=json&origin=*`;
  return timer(1000).pipe(
    switchMap(() => this.httpClient.get<[ string, string[] ]>(url)),
    map(data => data[1])
  )
   
}
}
