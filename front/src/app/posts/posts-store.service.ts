import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '../state/store';
import { Post } from './post.model';
import { Posts } from './posts.model';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostsStoreService extends Store<Posts[]> {

  constructor(private service: PostsService) {
    super();
  }

  init(): Promise<Posts[]> {
    if (this.get()) { return; }
    return this.service.getPosts().pipe(
      tap(this.store)
    ).toPromise();
  }

  create$(post: Post): Promise<Post> {
    console.log(post, 'soy el post-store');
    return this.service.createPost(post).pipe(
      tap(postResult => {
        this.store([postResult, ...this.get()]);
      })
    ).toPromise();
  }

  delete$(id: string): Promise<Post> {
    return this.service.deletePostById(id).pipe(
    tap(() => {
    const posts = this.get();
    const newPosts = posts.filter(post => post._id !== id);
    this.store(newPosts);
    })
    ).toPromise();
    }


}
