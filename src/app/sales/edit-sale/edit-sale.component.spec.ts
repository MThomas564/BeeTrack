import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditSaleComponent } from './edit-sale.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { ConfirmationService } from 'primeng/api';

const mockSale = { id: '1', numberOfJars: 5, notes: '', dateOfSale: new Date() };

const mockDataService = {
  getJarSale: jest.fn().mockResolvedValue(mockSale),
  updateSale: jest.fn().mockResolvedValue({}),
  deleteSale: jest.fn().mockResolvedValue(true),
};

describe('EditSaleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSaleComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        DatePickerModule,
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
    const fixture = TestBed.createComponent(EditSaleComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
