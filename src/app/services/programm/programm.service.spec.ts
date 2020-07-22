import { TestBed } from '@angular/core/testing';

import { ProgrammService } from './programm.service';

describe('ProgrammService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgrammService = TestBed.get(ProgrammService);
    expect(service).toBeTruthy();
  });
});
