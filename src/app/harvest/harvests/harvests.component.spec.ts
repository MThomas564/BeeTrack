import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HarvestsComponent } from './harvests.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { DateFormatPipe } from 'src/app/shared/date pipe/date-format.pipe';

const mockDataService = {
  getHarvests: jest.fn().mockResolvedValue([]),
};

describe('HarvestsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HarvestsComponent, DateFormatPipe],
      imports: [RouterTestingModule, TableModule, ButtonModule, NoopAnimationsModule],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(HarvestsComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads harvests on init', async () => {
    const fixture = TestBed.createComponent(HarvestsComponent);
    await fixture.whenStable();
    expect(mockDataService.getHarvests).toHaveBeenCalled();
  });
});
