import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestsComponent } from './harvests.component';

describe('HarvestsComponent', () => {
  let component: HarvestsComponent;
  let fixture: ComponentFixture<HarvestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HarvestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
