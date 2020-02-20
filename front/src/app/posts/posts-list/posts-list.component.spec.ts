import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsStoreService } from '../posts-store.service';
import { PostsService } from '../posts.service';
import { PostsListComponent } from './posts-list.component';

const config = {
  api: 'https://localhost:3443/'
};

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsListComponent ],
      providers: [
        PostsStoreService,
        PostsService,
        { provide: 'config', useValue: config },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should calls store init when inicializates', () => {
     const spyServiceInit = spyOn(TestBed.inject(PostsStoreService), 'init');
     component.ngOnInit();
     expect(spyServiceInit).toHaveBeenCalled();
  });
  it('should calls store get when inicializates', () => {
    const spyServiceGet = spyOn(TestBed.inject(PostsStoreService), 'get$');
    component.ngOnInit();
    expect(spyServiceGet).toHaveBeenCalled();
 });
  it('when call deletePost() should call store', () => {
    const spyService = spyOn(TestBed.inject(PostsStoreService), 'delete$');
    const id = 'asdkflasdjdfajksd';
    component.deletePost(id);
    expect(spyService).toHaveBeenCalled();
  });
  it('when call editPost() it navegates to edit', inject([Router], (router: Router) => {
    const routerSpy = spyOn(router, 'navigate');
    const id = 'asdkflasdjdfajksd';
    component.editPost(id);
    expect(routerSpy).toHaveBeenCalled();
  }));
});
