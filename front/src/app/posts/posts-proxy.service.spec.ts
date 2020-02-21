import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_POSTS } from './posts-list/posts-fake.spec';
import { PostsProxyService } from './posts-proxy.service';

const config = {
  api: 'https://localhost:3443/'
};
const FAKE_POST = {
  _id: 'asdad',
  author: 'me',
  urlToImage: 'asldfasfd',
  nickname: 'mi',
  title: 'asd',
  content: 'asdfasdf',
  likes: 4,
  filter: 'moon',
  userImage: 'askdjflasdj',
  comments: []
};
const FAKE_ID = '1234567';
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
    service.getPosts().subscribe(post => expect(post).toBe(FAKE_POSTS));
    const request = httpMock.expectOne('https://localhost:3443/posts');
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
    httpMock.verify();
  });

  it('should call to server to get post given an id', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    service.getPostById(FAKE_ID).subscribe(post => expect(post).toBe(FAKE_POST));
    const request = httpMock.expectOne(`https://localhost:3443/posts/${FAKE_ID}`);
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should call to server to delete post given an id', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    service.deletePostById(FAKE_ID).subscribe(post => expect(post).toBe(FAKE_POST));
    const request = httpMock.expectOne(`https://localhost:3443/posts/${FAKE_ID}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should call to server to create post', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    service.createPost(FAKE_POST).subscribe(post => expect(post).toBe(FAKE_POST));
    const request = httpMock.expectOne('https://localhost:3443/posts');
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

  it('should call to server to edit post', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    service.updatePost(FAKE_ID, FAKE_POST).subscribe(post => expect(post).toBe(FAKE_POST));
    const request = httpMock.expectOne(`https://localhost:3443/posts/${FAKE_ID}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_POST);
    httpMock.verify();
  });

});
