import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditInspectionComponent } from './edit-inspection.component';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';

const mockInspection = {
  id: '1',
  notes: 'test notes',
  inspectionDate: new Date(),
  inspectionNotes: [],
};

const mockDataService = {
  getHives: jest.fn().mockResolvedValue([]),
  getInspection: jest.fn().mockResolvedValue(mockInspection),
  updateInspection: jest.fn().mockResolvedValue({}),
};

describe('EditInspectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInspectionComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        ButtonModule,
        DatePickerModule,
        Select,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
      ],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(EditInspectionComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('initializes the inspection form with date and note controls', async () => {
    const fixture = TestBed.createComponent(EditInspectionComponent);
    await fixture.whenStable();
    const component = fixture.componentInstance;
    expect(component.inspectionForm.controls['date']).toBeTruthy();
    expect(component.inspectionForm.controls['note']).toBeTruthy();
    expect(component.inspectionForm.controls['hiveNotes']).toBeTruthy();
  });
});
