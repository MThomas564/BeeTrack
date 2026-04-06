import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddHarvestComponent } from './add-harvest.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';

const mockDataService = {
  getGroupedHives: jest.fn().mockResolvedValue([
    { label: 'Active', items: [] },
    { label: 'Inactive', items: [] },
  ]),
  addHoneyHarvest: jest.fn().mockResolvedValue({}),
};

describe('AddHarvestComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHarvestComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MultiSelectModule,
        ButtonModule,
        DatePickerModule,
        InputTextModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(AddHarvestComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads grouped hives on init', async () => {
    const fixture = TestBed.createComponent(AddHarvestComponent);
    await fixture.whenStable();
    expect(mockDataService.getGroupedHives).toHaveBeenCalled();
  });
});
