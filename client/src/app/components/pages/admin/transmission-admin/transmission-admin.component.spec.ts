import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionAdminComponent } from './transmission-admin.component';

describe('TransmissionAdminComponent', () => {
  let component: TransmissionAdminComponent;
  let fixture: ComponentFixture<TransmissionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransmissionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
