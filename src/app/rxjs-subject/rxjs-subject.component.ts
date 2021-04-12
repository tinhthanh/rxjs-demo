import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-rxjs-subject',
  templateUrl: './rxjs-subject.component.html',
  styleUrls: ['./rxjs-subject.component.scss']
})
export class RxjsSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Subject
    //  this.chapter1();
    // AsyncSubject 
  //  this.chapter2();
   //BehaviorSubject
  // this.chapter3() ;
// ReplaySubject
  // this.chapter4() ;
  }
 chapter1() {
      const sub = new Subject();
    //   sub.next(1);
    //   sub.subscribe(x => {
    //     console.log('Subscriber A', x);
    //   });
    //  sub.next(2);
      sub.subscribe(x => {
        console.log('Subscriber B', x);
      });
      sub.next(3); 
 }
 chapter2() {
    const sub = new AsyncSubject();
    // sub.next(1);
    // sub.subscribe(x => {
    //   console.log('Subscriber A', x);
    // });
    // sub.next(2);
    sub.subscribe(x => {
      console.log('Subscriber B', x);
    });
    sub.next(3); 
    // sub.complete(); 
}
chapter3() {
  const subject = new BehaviorSubject(123);
  subject.subscribe(console.log);
  subject.subscribe(console.log);
  subject.next(456);
  subject.subscribe(console.log);
  subject.next(789);
  
}
chapter4() {
  
const sub = new ReplaySubject(2);
sub.next(1);
sub.next(2);

sub.subscribe(console.log); 

sub.next(3); 
sub.next(4); 
sub.subscribe(console.log); 
sub.next(5); 
}
}
