import { TestBed } from '@angular/core/testing';

import { MovieCommentsService } from './movie-comments.service';

describe('MovieCommentsService', () => {
  let service: MovieCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
