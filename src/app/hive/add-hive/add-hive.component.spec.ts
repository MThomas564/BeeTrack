import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddHiveComponent } from './add-hive.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';

const mockDataService = {
  addHive: jest.fn().mockResolvedValue({}),
};

describe('AddHiveComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHiveComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', () => {
    const fixture = TestBed.createComponent(AddHiveComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
