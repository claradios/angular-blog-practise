import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostsStoreService } from '../posts-store.service';
import { PostsService } from '../posts.service';
import { PostDetailComponent } from './post-detail.component';
const config = {
  api: 'https://localhost:3443/'
};

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [PostsStoreService,
        PostsService,
        { provide: 'config', useValue: config },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when call deletePost() should call store', () => {
    const spyService = spyOn(TestBed.inject(PostsStoreService), 'delete$');
    component.deletePost();
    expect(spyService).toHaveBeenCalled();
  });

  it('when ngOnInit() should call postService', () => {
    const FAKEPOST = {
      _id: 'string',
      author: 'string',
      nickname: 'string',
      userImage: 'string',
      title: 'string',
      content: 'string',
      urlToImage: 'string',
      likes: 6,
      filter: 'string',
      comments: [{
        nickname: 'string',
        text: 'string',
        date: 'string',
        _id: 'string'
      }]
    };

    const spyService = spyOn(TestBed.inject(PostsService), 'getPostById').and.callFake(() => of(FAKEPOST));
    component.ngOnInit();
    expect(spyService).toHaveBeenCalled();
  });

  it('when call editPost() it navegates to edit', inject([Router], (router: Router) => {
    const routerSpy = spyOn(router, 'navigate');
    component.editPost();
    // expect(routerSpy).toHaveBeenCalledWith(['/edit']);
    expect(routerSpy).toHaveBeenCalled();
  }));
});
