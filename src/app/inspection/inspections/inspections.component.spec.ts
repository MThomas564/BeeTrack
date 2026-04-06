import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InspectionsComponent } from './inspections.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { DateFormatPipe } from 'src/app/shared/date pipe/date-format.pipe';

const mockDataService = {
  getInspections: jest.fn().mockResolvedValue([]),
};

describe('InspectionsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionsComponent, DateFormatPipe],
      imports: [RouterTestingModule, TableModule, ButtonModule, NoopAnimationsModule],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(InspectionsComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads inspections on init', async () => {
    const fixture = TestBed.createComponent(InspectionsComponent);
    await fixture.whenStable();
    expect(mockDataService.getInspections).toHaveBeenCalled();
  });
});
