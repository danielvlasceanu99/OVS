import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineDialogComponent } from './engine-dialog.component';

describe('EngineDialogComponent', () => {
  let component: EngineDialogComponent;
  let fixture: ComponentFixture<EngineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
