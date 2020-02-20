import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_POSTS } from './posts-list/posts-fake.spec';
import { PostsProxyService } from './posts-proxy.service';

const config = {
  api: 'https://localhost:3443/'
};

describe('PostsProxyService', () => {
  let service: PostsProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: 'config', useValue: config },
      ]
    });
    service = TestBed.inject(PostsProxyService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call to server to get posts', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    service.getPosts().subscribe(posts => expect(posts).toBe(FAKE_POSTS));
    const request = httpMock.expectOne('https://localhost:3443/posts');
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
    httpMock.verify();
  });
});
