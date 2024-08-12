import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaleComponent } from './add-sale.component';

describe('AddSaleComponent', () => {
  let component: AddSaleComponent;
  let fixture: ComponentFixture<AddSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
