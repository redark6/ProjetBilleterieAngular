import { TestBed } from '@angular/core/testing';

import { SearchResolverService } from './search-resolver.service';

describe('SearchResolverService', () => {
  let service: SearchResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
