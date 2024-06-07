import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHiveComponent } from './add-hive.component';

describe('AddHiveComponent', () => {
  let component: AddHiveComponent;
  let fixture: ComponentFixture<AddHiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
