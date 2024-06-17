import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInspectionComponent } from './add-inspection.component';

describe('AddInspectionComponent', () => {
  let component: AddInspectionComponent;
  let fixture: ComponentFixture<AddInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInspectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
