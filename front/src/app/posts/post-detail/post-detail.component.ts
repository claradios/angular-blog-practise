import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  id: string;
  sub: Subscription;
  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });
    this.sub = this.postsService.getPostById(this.id).subscribe(
      res => {
        this.post = res;
      },
      error => console.log(error)
    );

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  deletePost() {
    console.log('delete');
  }
  editPost() {
    console.log('edit');
  }

}
