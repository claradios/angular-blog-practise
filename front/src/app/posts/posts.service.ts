import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { PostDTO } from './post-dto.model';
import { Post } from './post.model';
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
  getPostById(id): Observable<Post> {
    return this.proxy.getPostById(id).pipe(
      map((postDTO: PostDTO) => {
        const post: Post = postDTO;
        return post;
      })
    );
  }

  deletePostById(id): Observable<Post> {
    console.log('soy el service', id);
    return this.proxy.deletePostById(id).pipe(
      map((postDTO: PostDTO) => {
        const post: Post = postDTO;
        return post;
      })
    );
  }

  updatePost(id, body): Observable<Post> {
    return this.proxy.updatePost(id, body).pipe(
      map((postDTO: PostDTO) => {
        const post: Post = postDTO;
        return post;
      })
    );
  }

  createPost(body): Observable<Post> {
    return this.proxy.createPost(body).pipe(
      map((postDTO: PostDTO) => {
        const post: Post = postDTO;
        return post;
      })
    );
  }
}
