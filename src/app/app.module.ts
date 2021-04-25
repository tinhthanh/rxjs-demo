import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsShareComponent } from './rxjs-share/rxjs-share.component';
import { RxjsShareReplayComponent } from './rxjs-share-replay/rxjs-share-replay.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RxjsSubjectComponent } from './rxjs-subject/rxjs-subject.component';
import { RxjsCombinationComponent } from './rxjs-combination/rxjs-combination.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule} from '@angular/common/http';
import { CreateObservableComponent } from './create-observable/create-observable.component';
@NgModule({
  declarations: [
    AppComponent,
    RxjsShareComponent,
    RxjsShareReplayComponent,
    RxjsSubjectComponent,
    RxjsCombinationComponent,
    SearchComponent,
    CreateObservableComponent,
    CreateObservableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
