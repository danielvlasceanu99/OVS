import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricEngineDialogComponent } from './electric-engine-dialog.component';

describe('ElectricEngineDialogComponent', () => {
  let component: ElectricEngineDialogComponent;
  let fixture: ComponentFixture<ElectricEngineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricEngineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricEngineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
