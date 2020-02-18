import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_POSTS } from './posts-list/posts-fake.spec';
import { PostsProxyService } from './posts-proxy.service';

describe('PostsProxyService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    const service: PostsProxyService = TestBed.inject(PostsProxyService);
    expect(service).toBeTruthy();
  });
  it('should call to server to get posts', () => {
    const service: PostsProxyService = TestBed.inject(PostsProxyService);
    const httpMock = TestBed.inject(HttpTestingController);
    service.getPosts().subscribe(posts => expect(posts).toBe(FAKE_POSTS));
    const request = httpMock.expectOne('https://localhost:3443/posts/');
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
    httpMock.verify();
  });
});


