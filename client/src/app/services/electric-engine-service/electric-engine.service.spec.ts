import { TestBed } from '@angular/core/testing';

import { ElectricEngineService } from './electric-engine.service';

describe('ElectricEngineService', () => {
  let service: ElectricEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectricEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
