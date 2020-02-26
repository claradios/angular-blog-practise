import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../post.model';
@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})

export class PostCommentComponent implements OnInit {
 @Input() comment: Comment;

  ngOnInit(): void {

  }
}
