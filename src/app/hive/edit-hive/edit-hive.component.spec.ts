import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHiveComponent } from './edit-hive.component';

describe('EditHiveComponent', () => {
  let component: EditHiveComponent;
  let fixture: ComponentFixture<EditHiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
