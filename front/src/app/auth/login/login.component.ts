import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { TokenDTO } from '../token.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {
  form: FormGroup;
  userToken: TokenDTO;
  sub: Subscription;
  constructor(private service: LoginService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSend($event) {
    $event.preventDefault();
    console.log(this.form.value);
    this.sub = this.service.getUserToken(this.form.value).subscribe(
      response => {
        this.userToken = response;
        console.log(this.form.value);
        console.log(this.userToken);
        sessionStorage.setItem('token', this.userToken.token);
      },
      error => console.log(error));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}