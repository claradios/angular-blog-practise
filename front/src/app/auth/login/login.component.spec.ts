import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginService } from '../login.service';
import { LoginComponent } from './login.component';
const config = {
  api: 'https://localhost:3443/'
};
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [LoginService, { provide: 'config', useValue: config }],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be two fields username and password', () => {
    expect(component.form.contains('username')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should required username', () => {
    const username = component.form.get('username');
    username.setValue('');
    expect(username.valid).toBeFalsy();
  });

  it('should required password', () => {
    const password = component.form.get('password');
    password.setValue('123456');
    expect(password.valid).toBeTruthy();
  });

  it('when click onSend() should call loginService', () => {
    const FAKE_LOGIN = {
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
    const spyService = spyOn(TestBed.inject(LoginService), 'getUserToken').and.callFake(() => of(FAKE_LOGIN));
    component.onSend(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
  });

});
