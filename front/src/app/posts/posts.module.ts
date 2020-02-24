import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
// import { PostsDashboardComponent } from './posts-dashboard/posts-dashboard.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const ROUTES: Routes = [
  {path: '', component: PostsListComponent},
  {path: ':id', component: PostDetailComponent},
 // {path: 'create', component: PostCreateComponent}
];
@NgModule({
  declarations: [PostsListComponent, PostDetailComponent, PostCreateComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class PostsModule { }
