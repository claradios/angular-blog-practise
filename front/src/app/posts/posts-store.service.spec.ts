import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostsStoreService } from './posts-store.service';
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
  userImage: 'askdjflasdj'
};
const FAKE_POSTS = [{
  _id: 'asdad',
  author: 'me',
  title: 'asd',
  likes: 4,
  filter: 'moon',
  urlToImage: 'asldfasfd',
}];

describe('PostsStoreService', () => {
  let service: PostsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsService,
        { provide: 'config', useValue: config },
      ]
    });
    service = TestBed.inject(PostsStoreService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when calling create$ should call createPosts from service', () => {

    const spyService = spyOn(TestBed.inject(PostsService), 'createPost').and.callFake(() => of(FAKE_POST));
    service.create$(FAKE_POST);
    expect(spyService).toHaveBeenCalled();
  });
  it('when calling delete$ should call deletePostsById from service', () => {

    const spyService = spyOn(TestBed.inject(PostsService), 'deletePostById').and.callFake(() => of(FAKE_POST));
    service.delete$(FAKE_ID);
    expect(spyService).toHaveBeenCalled();
  });

  it('when calling update$ should call updatePosts from service', () => {

    const spyService = spyOn(TestBed.inject(PostsService), 'updatePost').and.callFake(() => of(FAKE_POST));
    service.update$(FAKE_ID, FAKE_POST);
    expect(spyService).toHaveBeenCalled();
  });


  it('when calling init() should call getPosts from service', () => {
    const spyService = spyOn(TestBed.inject(PostsService), 'getPosts').and.callFake(() => of(FAKE_POSTS));
    service.init();
    expect(spyService).toHaveBeenCalled();
  });
});
