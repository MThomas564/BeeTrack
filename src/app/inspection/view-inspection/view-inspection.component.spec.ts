import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ViewInspectionComponent } from './view-inspection.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { ConfirmationService } from 'primeng/api';
import { StatusTagComponent } from 'src/app/shared/status-tag/status-tag.component';
import { DateFormatPipe } from 'src/app/shared/date pipe/date-format.pipe';
import { TagModule } from 'primeng/tag';

const mockInspection = {
  id: '1',
  notes: 'All fine',
  inspectionDate: new Date(),
  inspectionNotes: [],
};

const mockDataService = {
  getInspection: jest.fn().mockResolvedValue(mockInspection),
  deleteInspection: jest.fn().mockResolvedValue(true),
};

describe('ViewInspectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewInspectionComponent, StatusTagComponent, DateFormatPipe],
      imports: [RouterTestingModule, ButtonModule, ConfirmDialogModule, TagModule, NoopAnimationsModule],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        ConfirmationService,
      ],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(ViewInspectionComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
