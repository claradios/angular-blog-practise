import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { PostsDTO } from './posts-dto.model';
import { PostsProxyService } from './posts-proxy.service';
import { Posts } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private proxy: PostsProxyService) { }
  getPosts(): Observable<Posts[]> {
    return this.proxy.getPosts().pipe(
      map((postsDTO: PostsDTO[]) => {
        let posts: Posts[] = [];
        postsDTO.map((postDTO: PostsDTO) => {
          const post: Posts = {
            _id: postDTO._id,
            author: postDTO.author,
            nickname: postDTO.nickname,
            userImage: postDTO.userImage,
            title: postDTO.title,
            urlToImage: postDTO.urlToImage,
            likes: postDTO.likes,
            filter: postDTO.filter
          };
          posts = [...posts, post];
        });
        return posts;
      })
    );
  }
}
