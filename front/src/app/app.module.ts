import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { LayoutModule } from './layout/layout.module';
import { PostsModule } from './posts/posts.module';


const config = {
  api: 'https://localhost:3443/'
};
const ROUTES: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)

      }
    ]
  },
  // {
  //   path: 'login',
  //   component: SimpleComponent,
  //   children: [
  //     {
  //       path: '', component: LoginComponent
  //     }
  //   ]
  // },
  { path: '**', redirectTo: 'feed', pathMatch: 'full' }

];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    LayoutModule,
    PostsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'config', useValue: config },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
