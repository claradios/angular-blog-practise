import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { LayoutModule } from './layout/layout.module';
import { SimpleComponent } from './layout/simple/simple.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

      },
      {
        path: 'create', component: PostCreateComponent
      },
      {
        path: 'edit/:id', component: PostCreateComponent
      },
    ]
  },
  {
    path: '',
    component: SimpleComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      { path: 'signup', component: SignupComponent}
    ]
  },
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
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // BrowserAnimationsModule,
  ],
  providers: [
    { provide: 'config', useValue: config },
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
