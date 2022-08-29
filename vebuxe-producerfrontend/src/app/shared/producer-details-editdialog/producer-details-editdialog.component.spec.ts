import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerDetailsEditdialogComponent } from './producer-details-editdialog.component';

describe('ProducerDetailsEditdialogComponent', () => {
  let component: ProducerDetailsEditdialogComponent;
  let fixture: ComponentFixture<ProducerDetailsEditdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducerDetailsEditdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerDetailsEditdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
