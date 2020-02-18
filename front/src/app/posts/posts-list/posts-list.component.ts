import { Component, OnInit } from '@angular/core';
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


  constructor(private store: PostsStoreService) { }

  ngOnInit(): void {
    this.store.init();
    this.posts$ = this.store.get$();
  }

}
