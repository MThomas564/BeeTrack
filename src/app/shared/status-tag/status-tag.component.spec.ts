import { TestBed } from '@angular/core/testing';
import { StatusTagComponent } from './status-tag.component';
import { TagModule } from 'primeng/tag';

describe('StatusTagComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusTagComponent],
      imports: [TagModule],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(StatusTagComponent);
    fixture.componentInstance.name = 'Queen';
    fixture.componentInstance.value = true;
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
