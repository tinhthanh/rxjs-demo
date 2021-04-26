import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, of, throwError, timer } from 'rxjs';
import { catchError, delay, filter, map, mergeMap, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { DestroyService } from '../destroy.service';

@Component({
  selector: 'app-rxjs-combination',
  templateUrl: './rxjs-combination.component.html',
  styleUrls: ['./rxjs-combination.component.scss'],
  providers: [DestroyService]
})
export class RxjsCombinationComponent implements OnInit {
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  userUrl = 'https://jsonplaceholder.typicode.com/users';
  postUrl = 'https://jsonplaceholder.typicode.com/posts';
  private userSelectedSubject = new BehaviorSubject<string>('');
  userSelectedAction$ = this.userSelectedSubject.asObservable();


    // All Users
    users$ = this.http.get<User[]>(this.userUrl)
    .pipe(
      // tap(data => console.log('users', JSON.stringify(data))),
      catchError(err => throwError('Error occurred'))
    );

  // All ToDo's
  // todos$ = this.http.get<ToDo[]>(this.todoUrl)
  //   .pipe(
  //     tap(data => console.log('todos', JSON.stringify(data))),
  //     catchError(err => throwError('Error occurred'))
  //   );



  // One user's todo's
  // This example hard-codes a username.
  // Returns the todo's for a specific user
  userName = 'Kamren';
  todosForUser$ = this.http.get<User[]>(`${this.userUrl}?username=${this.userName}`)
    .pipe(
      map(users => users[0]),
      switchMap(user =>
        this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`)
      )
    );
  

  // One user's todo's
  // This example hard-codes a username
  // Returns both the user name and todo's
  // todosForUser2$ = this.http.get<User[]>(`${this.userUrl}?username=${this.userName}`)
  //   .pipe(
  //     map(users => users[0]),
  //     switchMap(user =>
  //       forkJoin(
  //         this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`)
  //       )
  //         .pipe(
  //           map(([todos]) => ({
  //             name: user.name,
  //             todos: todos,
  //             posts: []
  //           }) as UserData)
  //         )
  //     )
  //   );

  // Get multiple sets of related data and return it all as a single object
  // Uses hard-coded userName
  // dataForUser2$ = this.http.get<User[]>(`${this.userUrl}?username=${this.userName}`)
  //   .pipe(
  //     // This particular http request returns an array.
  //     // We only want the first element.
  //     map(users => users[0]),
  //     switchMap(user =>
  //       combineLatest([
  //         this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`),
  //         this.http.get<Post[]>(`${this.postUrl}?userId=${user.id}`)
  //       ])
  //         .pipe(
  //           map(([todos, posts]) => ({
  //             name: user.name,
  //             todos: todos,
  //             posts: posts
  //           }) as UserData)
  //         )
  //     )
  //   );

  // Gets multiple sets of related data and returns it all as a single object
  // Uses an action stream to "pass in" the parameter for the first query.
  // Uses combineLatest
  // dataForUser3$ = this.userSelectedAction$
  //   .pipe(
  //     // Handle the case of no selection
  //     filter(userName => Boolean(userName)),
  //     // Get the user given the user name
  //     switchMap(userName => this.http.get<User[]>(`${this.userUrl}?username=${userName}`)
  //       .pipe(
  //         // The query returns an array of users, we only want the first one
  //         map(users => users[0]),
  //         switchMap(user =>
  //           // Pull in any related streams
  //           combineLatest([
  //             this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`),
  //             this.http.get<Post[]>(`${this.postUrl}?userId=${user.id}`)
  //           ])
  //             .pipe(
  //               // Map the data into the desired format for display
  //               map(([todos, posts]) => ({
  //                 name: user.name,
  //                 todos: todos,
  //                 posts: posts
  //               }) as UserData)
  //             )
  //         )
  //       )
  //     )
  //   );

  // Gets multiple sets of related data and returns it all as a single object
  // Uses an action stream to "pass in" the parameter for the first query.
  // Uses forkJoin
  dataForUser$ = this.userSelectedAction$
    .pipe(
      filter(userName => Boolean(userName)),
      tap(console.log),
      switchMap(userName => this.http.get<User[]>(`${this.userUrl}?username=${userName}`)
        .pipe(
          map(users => users[0]),
          switchMap(user =>
            forkJoin([
              this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`),
              this.http.get<Post[]>(`${this.postUrl}?userId=${user.id}`)
            ])
              .pipe(
                map(([todos, posts]) => ({
                  name: user.name,
                  todos: todos,
                  posts: posts
                }) as UserData)
              )
          )
        )
      )
    );
  constructor(private readonly $destroy: DestroyService,public http: HttpClient) { }

  onSelected(userName: string): void {
    this.userSelectedSubject.next(userName);
  }
  ngOnInit() {
    this.chapter1();
    // this.todosForUser$.subscribe( z=> {
    //   console.log(z);
    // })
    // this. dataForUser$.subscribe( z => {
    //   console.log(z);
    // })
  }
  chapter1() {
    const timerOne$ = timer(1000, 4000);
    const timerTwo$ = timer(2000, 4000);
    const timerThree$ = timer(3000, 4000);
      // combineLatest(timerOne$, timerTwo$, timerThree$).pipe(take(4), takeUntil(this.$destroy)).subscribe(
      //   ([timerValOne, timerValTwo, timerValThree]) => {
      //     console.log(
      //       `Timer One Latest: ${timerValOne},
      //     Timer Two Latest: ${timerValTwo},
      //     Timer Three Latest: ${timerValThree}`
      //     );
      //   }
      // );


    // function 
      // combineLatest(
      //   timerOne$,
      //   timerTwo$,
      //   timerThree$,
      //   // combineLatest also takes an optional projection function
      //   (one, two, three) => {
      //     return `Timer One (Proj) Latest: ${one}, 
      //               Timer Two (Proj) Latest: ${two}, 
      //               Timer Three (Proj) Latest: ${three}`;
      //   }
      // ).subscribe(console.log);

    // const  USERS = 'https://jsonplaceholder.typicode.com/users/';
    // const POSTS = 'https://jsonplaceholder.typicode.com/posts/';
    //   forkJoin([this.http.get<any[]>(USERS), this.http.get<any[]>(POSTS)])
    //   .subscribe(res => {
    //     console.log ('User and Post', res);
    //   });
  }
  makeRequest(value: string, delayDuration: number) {
    return of(`Complete: ${value}`).pipe(
      delay(delayDuration)
    );
  }

}


export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string
}

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export interface UserData {
  name: string;
  posts: Post[];
  todos: ToDo[];
}
