import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const ROUTES: Routes = [
  {path: '', component: PostsListComponent},
  {path: ':id', component: PostDetailComponent}
];

@NgModule({
  declarations: [PostsListComponent, PostDetailComponent, PostCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule
  ]
})
export class PostsModule { }
