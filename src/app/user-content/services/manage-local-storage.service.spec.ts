import { TestBed } from '@angular/core/testing';

import { ManageLocalStorageService } from './manage-local-storage.service';

describe('ManageLocalStorageService', () => {
  let service: ManageLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
