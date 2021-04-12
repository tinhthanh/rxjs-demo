import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsCombinationComponent } from './rxjs-combination/rxjs-combination.component';
import { RxjsShareReplayComponent } from './rxjs-share-replay/rxjs-share-replay.component';
import { RxjsShareComponent } from './rxjs-share/rxjs-share.component';
import { RxjsSubjectComponent } from './rxjs-subject/rxjs-subject.component';


const routes: Routes = [{
    path:'rxjs-comination',
    component: RxjsCombinationComponent
  } ,
  {
    path: 'rxjs-subject',
    component: RxjsSubjectComponent
  },{
  path: 'share',
  component: RxjsShareComponent
},{
  path: 'share-replay',
  component: RxjsShareReplayComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
