import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDTO } from './post-dto.model';
import { PostsDTO } from './posts-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PostsProxyService {

  constructor(private httpClient: HttpClient, @Inject('config') private config: any) { }
  getPosts(): Observable<PostsDTO[]> {
    return this.httpClient.get<PostsDTO[]>(this.config.api + 'posts');
  }
  getPostById(id): Observable<PostDTO> {
    return this.httpClient.get<PostDTO>(this.config.api + 'posts/' + id);
  }
  deletePostById(id): Observable<PostDTO> {
    console.log('soy el proxy del delete', id);
    return this.httpClient.delete<PostDTO>(this.config.api + 'posts/' + id);
  }
  createPost(body): Observable<PostDTO> {
    return this.httpClient.post<PostDTO>(this.config.api + 'posts', body);
  }
}

// https://localhost:3443/posts/
