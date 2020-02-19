import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sub: Subscription;
  success: string;
  error: string;
  constructor(private service: SignupService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      nickname: new FormControl('', [Validators.required]),
      userImage: new FormControl(),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  onSignup($event) {
    $event.preventDefault();
    this.sub = this.service.getData(this.form.value).subscribe(
      response => {
        this.success = 'All good!';
      },
      error => this.error = 'OOoops! Something went wrong: ' + error.message
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
