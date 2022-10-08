import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAdminComponent } from './transaction-admin.component';

describe('TransactionAdminComponent', () => {
  let component: TransactionAdminComponent;
  let fixture: ComponentFixture<TransactionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
