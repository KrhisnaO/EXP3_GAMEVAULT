import { TestBed } from '@angular/core/testing';

import { PreventasService } from './preventas.service';

describe('PreventasService', () => {
  let service: PreventasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
