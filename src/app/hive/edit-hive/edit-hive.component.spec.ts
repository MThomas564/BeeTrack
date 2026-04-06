import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditHiveComponent } from './edit-hive.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';

const mockHive = { id: '1', name: 'Test Hive', archived: false, origin: '', yearOfQueen: '' };

const mockDataService = {
  getHive: jest.fn().mockResolvedValue(mockHive),
  updateHive: jest.fn().mockResolvedValue({}),
};

describe('EditHiveComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHiveComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
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
    const fixture = TestBed.createComponent(EditHiveComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
