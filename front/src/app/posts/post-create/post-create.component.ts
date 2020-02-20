import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsStoreService } from '../posts-store.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
  route: string = this.router.url;
  edit = true;
  re = /edit/gi;

  constructor(private store: PostsStoreService, private router: Router) { }

  ngOnInit(): void {
    if (this.route.search(this.re) === -1) {
      this.edit = false;
    }
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
  }

  onCreate($event) {
    $event.preventDefault();
    this.store.create$(this.form.value);
  }
  onUpdate($event) {
    console.log(this.edit);
    $event.preventDefault();

  }
}
