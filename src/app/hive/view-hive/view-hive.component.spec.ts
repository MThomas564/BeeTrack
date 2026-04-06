import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ViewHiveComponent } from './view-hive.component';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StatusTagComponent } from 'src/app/shared/status-tag/status-tag.component';
import { DateFormatPipe } from 'src/app/shared/date pipe/date-format.pipe';

const mockHive = { id: '1', name: 'Test Hive', archived: false, origin: '', yearOfQueen: '' };

const mockDataService = {
  getHive: jest.fn().mockResolvedValue(mockHive),
  getInspectionNotesByHive: jest.fn().mockResolvedValue([]),
  getHarvestsByHive: jest.fn().mockResolvedValue([]),
};

describe('ViewHiveComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHiveComponent, StatusTagComponent, DateFormatPipe],
      imports: [
        RouterTestingModule,
        AccordionModule,
        TableModule,
        ButtonModule,
        TagModule,
        ConfirmDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        ConfirmationService,
      ],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', async () => {
    const fixture = TestBed.createComponent(ViewHiveComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
