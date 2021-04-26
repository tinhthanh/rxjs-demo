import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from, interval, Observable, pipe, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap , catchError,map, first, delay, takeWhile, filter, tap } from 'rxjs/operators';
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
}
public ngOnInit() {
  this.searchWords$ = this.search$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(text => text
      ? timer(500).pipe(
        tap( ()=> console.log("Call api....")),
        switchMap(() => this.httpClient.get<[ string, string[] ]>
        (`https://en.wikipedia.org/w/api.php?action=opensearch&search=${text}&limit=100&namespace=0&format=json&origin=*`)),
        map(data => data[1])
      )
      : of([])),
    catchError(() => of([]))
  );
}
public search(text: string): void {
  this.search$.next(text);
}
}
