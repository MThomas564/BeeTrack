import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaleComponent } from './edit-sale.component';

describe('EditSaleComponent', () => {
  let component: EditSaleComponent;
  let fixture: ComponentFixture<EditSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
