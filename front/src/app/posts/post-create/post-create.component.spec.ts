import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsStoreService } from '../posts-store.service';
import { PostsService } from '../posts.service';
import { PostCreateComponent } from './post-create.component';
const config = {
  api: 'https://localhost:3443/'
};

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostCreateComponent],
      providers: [PostsStoreService, PostsService, { provide: 'config', useValue: config }],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be four fields title, content, urlToImage', () => {
    expect(component.form.contains('title')).toBeTruthy();
    expect(component.form.contains('content')).toBeTruthy();
    expect(component.form.contains('urlToImage')).toBeTruthy();
  });
  it('should required title', () => {
    const username = component.form.get('title');
    username.setValue('');
    expect(username.valid).toBeFalsy();
  });
  it('should required nickname', () => {
    const nickname = component.form.get('content');
    nickname.setValue('');
    expect(nickname.valid).toBeFalsy();
  });
  it('when call onCreate() should call preventdefault', () => {
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    component.onCreate(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('when call onUpdate() should call preventdefault', () => {
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    component.onUpdate(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('when click onCreate() should call store', () => {
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    // component.form.get('title').setValue('mi título');
    // component.form.get('content').setValue('mi contenido');

    const spyService = spyOn(TestBed.inject(PostsStoreService), 'create$');
    // .and.callFake(() => of(FAKE_POST));
    component.onCreate(ev);
    expect(spyService).toHaveBeenCalled();
  });

  it('when click onUpdate() should call store', () => {
    const ev = jasmine.createSpyObj('e', ['preventDefault']);
    const spyService = spyOn(TestBed.inject(PostsStoreService), 'update$');
    component.onUpdate(ev);
    expect(spyService).toHaveBeenCalled();
  });

});
