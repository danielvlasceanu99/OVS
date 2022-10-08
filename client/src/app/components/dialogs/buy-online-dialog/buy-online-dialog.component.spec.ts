import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOnlineDialogComponent } from './buy-online-dialog.component';

describe('BuyOnlineDialogComponent', () => {
  let component: BuyOnlineDialogComponent;
  let fixture: ComponentFixture<BuyOnlineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyOnlineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOnlineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
