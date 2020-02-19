import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
  // userToken: TokenDTO;
  // sub: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(
        '',
        [
          Validators.required
        ]
      )
   });
  }
  onCreate($event) {
    $event.preventDefault();
    console.log('hola');
  }
}
