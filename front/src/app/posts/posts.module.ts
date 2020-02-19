import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';

const ROUTES: Routes = [
  {path: '', component: PostsListComponent}
];

@NgModule({
  declarations: [PostsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule
  ]
})
export class PostsModule { }
