import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsStoreService } from '../posts-store.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
  sub: Subscription;
  post: Post;
  id: string;
  route: any = this.router.url;
  edit: boolean;
  re = /edit/gi;
  titleVal: string;
  contentVal: string;

  constructor(private store: PostsStoreService,
              private router: Router,
              private postsService: PostsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      content: new FormControl(
        '',
        [Validators.required]
      ),
      urlToImage: new FormControl(
        '',
        [Validators.required]
      )
    });

    if (this.route.search(this.re) === -1) {
      this.edit = false;
    } else {
      this.edit = true;
      this.activatedRoute.params.subscribe((params) => {
        this.id = params.id;
      });
      this.sub = this.postsService.getPostById(this.id).subscribe(
        res => {
          this.form.get('title').setValue(res.title);
          this.form.get('content').setValue(res.content);
        },
        error => console.log(error)
      );
    }
  }

  onCreate($event) {
    $event.preventDefault();
    this.store.create$(this.form.value);
    this.router.navigate(['feed']);
  }
  onUpdate($event) {
    console.log(this.edit);
    $event.preventDefault();
    this.store.update$(this.id, this.form.value);
    this.router.navigate(['feed']);
  }
}
