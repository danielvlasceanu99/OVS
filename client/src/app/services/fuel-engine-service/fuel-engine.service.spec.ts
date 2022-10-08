import { TestBed } from '@angular/core/testing';

import { FuelEngineService } from './fuel-engine.service';

describe('FuelEngineService', () => {
  let service: FuelEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
