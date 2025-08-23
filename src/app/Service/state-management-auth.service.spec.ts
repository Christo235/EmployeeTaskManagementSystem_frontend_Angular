import { TestBed } from '@angular/core/testing';

import { StateManagementAuthService } from './state-management-auth.service';

describe('StateManagementAuthService', () => {
  let service: StateManagementAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateManagementAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
