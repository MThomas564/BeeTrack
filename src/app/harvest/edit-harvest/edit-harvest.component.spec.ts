import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditHarvestComponent } from './edit-harvest.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';

const mockHarvest = {
  id: '1', notes: '', frameCount: 0, poundsCollected: 0, jars: 0,
  collectedDate: new Date(), jarDate: new Date(),
};

const mockDataService = {
  getGroupedHives: jest.fn().mockResolvedValue([{ label: 'Active', items: [] }]),
  getHarvest: jest.fn().mockResolvedValue([mockHarvest, []]),
  updateHarvest: jest.fn().mockResolvedValue({}),
};

describe('EditHarvestComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHarvestComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MultiSelectModule,
        ButtonModule,
        DatePickerModule,
        InputTextModule,
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
    const fixture = TestBed.createComponent(EditHarvestComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
