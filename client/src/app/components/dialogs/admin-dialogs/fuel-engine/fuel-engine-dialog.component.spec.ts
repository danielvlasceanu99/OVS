import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelEngineDialogComponent } from './fuel-engine-dialog.component';

describe('FuelEngineComponent', () => {
  let component: FuelEngineDialogComponent;
  let fixture: ComponentFixture<FuelEngineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelEngineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelEngineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
