import { TestBed } from '@angular/core/testing';

import { PostsStoreService } from './posts-store.service';

describe('PostsStoreService', () => {
  let service: PostsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
