import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivesComponent } from './hives.component';

describe('HivesComponent', () => {
  let component: HivesComponent;
  let fixture: ComponentFixture<HivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
