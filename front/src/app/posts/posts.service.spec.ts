import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostsProxyService } from './posts-proxy.service';
import { PostsService } from './posts.service';
const config = {
  api: 'https://localhost:3443/'
};

const FAKE_ID = '1234567';
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
const FAKE_POSTS = [{
  _id: 'asdad',
  author: 'me',
  title: 'asd',
  likes: 4,
  filter: 'moon',
  urlToImage: 'asldfasfd',
  nickname: '',
  userImage: '',
  content: ''
}];
describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsProxyService,
        { provide: 'config', useValue: config },
      ]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getPosts method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'getPosts').and.callFake(() => of(FAKE_POSTS));
    service.getPosts();
    expect(spyService).toHaveBeenCalled();
  });
  it('getPostById method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'getPostById').and.callFake(() => of(FAKE_POST));
    service.getPostById(FAKE_ID);
    expect(spyService).toHaveBeenCalledWith(FAKE_ID);
  });
  it('deletePostById method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'deletePostById').and.callFake(() => of(FAKE_POST));
    service.deletePostById(FAKE_ID);
    expect(spyService).toHaveBeenCalledWith(FAKE_ID);
  });
  it('updatePost method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'updatePost').and.callFake(() => of(FAKE_POST));
    service.updatePost(FAKE_ID, FAKE_POST);
    expect(spyService).toHaveBeenCalledWith(FAKE_ID, FAKE_POST);
  });
  it('createPost method', () => {
    const spyService = spyOn(TestBed.inject(PostsProxyService), 'createPost').and.callFake(() => of(FAKE_POST));
    service.createPost(FAKE_POST);
    expect(spyService).toHaveBeenCalledWith(FAKE_POST);
   });
});
