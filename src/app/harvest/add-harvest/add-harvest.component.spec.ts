import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHarvestComponent } from './add-harvest.component';

describe('AddHarvestComponent', () => {
  let component: AddHarvestComponent;
  let fixture: ComponentFixture<AddHarvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHarvestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHarvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
