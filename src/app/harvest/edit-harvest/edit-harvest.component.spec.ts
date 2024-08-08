import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHarvestComponent } from './edit-harvest.component';

describe('EditHarvestComponent', () => {
  let component: EditHarvestComponent;
  let fixture: ComponentFixture<EditHarvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHarvestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHarvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
