import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SalesComponent } from './sales.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { DateFormatPipe } from 'src/app/shared/date pipe/date-format.pipe';

const mockDataService = {
  getJarSales: jest.fn().mockResolvedValue([]),
  getTotalJarsSold: jest.fn().mockResolvedValue(0),
};

describe('SalesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesComponent, DateFormatPipe],
      imports: [RouterTestingModule, TableModule, ButtonModule, NoopAnimationsModule],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(SalesComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads sales and total on init', async () => {
    const fixture = TestBed.createComponent(SalesComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(mockDataService.getJarSales).toHaveBeenCalled();
    expect(mockDataService.getTotalJarsSold).toHaveBeenCalled();
  });
});
