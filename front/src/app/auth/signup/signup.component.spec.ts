import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SignupService } from '../signup.service';
import { SignupComponent } from './signup.component';

const config = {
  api: 'https://localhost:3443/'
};

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers: [SignupService, { provide: 'config', useValue: config }],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be four fields username, nickname, password and userImage', () => {
    expect(component.form.contains('username')).toBeTruthy();
    expect(component.form.contains('nickname')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
    expect(component.form.contains('userImage')).toBeTruthy();
  });
  it('should required username', () => {
    const username = component.form.get('username');
    username.setValue('');
    expect(username.valid).toBeFalsy();
  });
  it('should required nickname', () => {
    const nickname = component.form.get('nickname');
    nickname.setValue('');
    expect(nickname.valid).toBeFalsy();
  });
  it('should required password', () => {
    const password = component.form.get('password');
    password.setValue('123456');
    expect(password.valid).toBeTruthy();
  });
  it('when click onSend() should call loginService', () => {
    const FAKE_SIGNUP = {
      message: 'string',
      token: 'string',
      userData: {
        username: 'string',
        rol: 'string',
        nickname: 'string',
        userImage: 'string'
      }
    };
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    const spyService = spyOn(TestBed.inject(SignupService), 'getData').and.callFake(() => of(FAKE_SIGNUP));
    component.onSignup(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
  });

});
