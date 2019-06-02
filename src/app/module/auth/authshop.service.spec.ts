import { TestBed } from '@angular/core/testing';

import { AuthshopService } from './authshop.service';

describe('AuthshopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthshopService = TestBed.get(AuthshopService);
    expect(service).toBeTruthy();
  });
});
