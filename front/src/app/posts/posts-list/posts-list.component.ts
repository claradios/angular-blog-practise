import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsStoreService } from '../posts-store.service';
import { Posts } from '../posts.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit {
  posts$: Observable<Posts[]>;


  constructor(private store: PostsStoreService, private router: Router) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();
  }
  deletePost($event) {
    const id = $event.currentTarget.parentElement.id;
    this.store.delete$(id);
  }
  editPost($event) {
    const id = $event.currentTarget.parentElement.id;
    this.router.navigate(['edit/' + id]);
    console.log(id);
  }
}
