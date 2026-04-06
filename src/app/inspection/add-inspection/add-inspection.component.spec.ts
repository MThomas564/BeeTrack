import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddInspectionComponent } from './add-inspection.component';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';
import { Hive } from 'src/shared/hive';

const mockHives: Partial<Hive>[] = [
  { id: '1', name: 'Alpha', archived: false },
  { id: '2', name: 'Beta', archived: false },
];

const mockDataService = {
  getActiveHives: jest.fn().mockResolvedValue(mockHives),
  addInspectAndNotes: jest.fn().mockResolvedValue({ id: 'new-id' }),
};

describe('AddInspectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddInspectionComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        DatePickerModule,
        Select,
        ButtonModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  async function createComponent() {
    const fixture = TestBed.createComponent(AddInspectionComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('loads active hives on init', async () => {
    await createComponent();
    expect(mockDataService.getActiveHives).toHaveBeenCalled();
  });

  it('starts with one hive note form', async () => {
    const fixture = await createComponent();
    expect(fixture.componentInstance.hiveForms.length).toBe(1);
  });

  it('adds a hive note when addHiveNote is called', async () => {
    const fixture = await createComponent();
    fixture.componentInstance.addHiveNote();
    expect(fixture.componentInstance.hiveForms.length).toBe(2);
  });

  it('removes a hive note when removeHiveNote is called', async () => {
    const fixture = await createComponent();
    fixture.componentInstance.addHiveNote();
    fixture.componentInstance.removeHiveNote(0);
    expect(fixture.componentInstance.hiveForms.length).toBe(1);
  });

  it('form is invalid when date is cleared', async () => {
    const fixture = await createComponent();
    fixture.componentInstance.inspectionForm.controls['date'].setValue(null);
    fixture.componentInstance.inspectionForm.controls['date'].markAsTouched();
    expect(fixture.componentInstance.inspectionForm.invalid).toBe(true);
  });

  it('submits the inspection form and navigates away', async () => {
    const fixture = await createComponent();
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    fixture.componentInstance.inspectionForm.controls['date'].setValue(new Date());
    await fixture.componentInstance.submit();

    expect(mockDataService.addInspectAndNotes).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('inspections');
  });
});
