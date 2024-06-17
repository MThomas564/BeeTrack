import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInspectionComponent } from './view-inspection.component';

describe('ViewInspectionComponent', () => {
  let component: ViewInspectionComponent;
  let fixture: ComponentFixture<ViewInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInspectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
