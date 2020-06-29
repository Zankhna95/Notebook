import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NoteComponent } from './note/note.component';
import { LogInPageComponent } from './log-in/log-in.component';
const routes: Routes = [
  { path: '', component: LogInPageComponent },
  { path: 'notebook', component: NoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
