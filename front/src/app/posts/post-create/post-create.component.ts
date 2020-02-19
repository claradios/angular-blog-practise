import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsStoreService } from '../posts-store.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private store: PostsStoreService) { }

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
  }

  onCreate($event) {
    $event.preventDefault();
    console.log('soy el onCreate del componente');
    this.store.create$(this.form.value);
   // this.postsService.createPost(this.form.value);
  }
}
