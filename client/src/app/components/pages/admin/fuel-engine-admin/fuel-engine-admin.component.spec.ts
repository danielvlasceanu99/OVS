import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelEngineAdminComponent } from './fuel-engine-admin.component';

describe('FuelEngineAdminComponent', () => {
  let component: FuelEngineAdminComponent;
  let fixture: ComponentFixture<FuelEngineAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelEngineAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelEngineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
