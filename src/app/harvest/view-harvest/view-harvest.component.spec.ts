import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ViewHarvestComponent } from './view-harvest.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { ConfirmationService } from 'primeng/api';
import { DateFormatPipe } from 'src/app/shared/date pipe/date-format.pipe';

const mockHarvest = {
  id: '1', notes: '', frameCount: 0, poundsCollected: 0, jars: 0,
  collectedDate: new Date(), jarDate: new Date(),
};

const mockDataService = {
  getHarvest: jest.fn().mockResolvedValue([mockHarvest, []]),
  deleteHarvest: jest.fn().mockResolvedValue(true),
};

describe('ViewHarvestComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHarvestComponent, DateFormatPipe],
      imports: [RouterTestingModule, ButtonModule, ConfirmDialogModule, NoopAnimationsModule],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        ConfirmationService,
      ],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(ViewHarvestComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
