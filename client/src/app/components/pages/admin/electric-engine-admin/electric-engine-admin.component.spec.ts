import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricEngineAdminComponent } from './electric-engine-admin.component';

describe('ElectricEngineAdminComponent', () => {
  let component: ElectricEngineAdminComponent;
  let fixture: ComponentFixture<ElectricEngineAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricEngineAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricEngineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
