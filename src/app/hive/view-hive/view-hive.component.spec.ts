import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHiveComponent } from './view-hive.component';

describe('ViewHiveComponent', () => {
  let component: ViewHiveComponent;
  let fixture: ComponentFixture<ViewHiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
