import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSaleComponent } from './add-sale.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';

const mockDataService = {
  addSale: jest.fn().mockResolvedValue({}),
};

describe('AddSaleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSaleComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        DatePickerModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  it('creates the component', () => {
    const fixture = TestBed.createComponent(AddSaleComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
