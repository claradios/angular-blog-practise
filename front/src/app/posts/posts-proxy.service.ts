import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsDTO } from './posts-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostsProxyService {

  constructor(private httpClient: HttpClient, @Inject('config') private config: any) { }
              getPosts(): Observable<PostsDTO[]> {
    return this.httpClient.get<PostsDTO[]>(this.config.api + 'posts');
  }
}

// https://localhost:3443/posts/
