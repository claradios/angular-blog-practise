import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { TokenDTO } from '../token.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  form: FormGroup;
  userToken: TokenDTO;
  sub: Subscription;

  constructor(private service: LoginService, private router: Router) { }

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
        this.router.navigate(['feed']);
        sessionStorage.setItem('token', this.userToken.token);
      },
      error => console.log(error));
  }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
