import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HivesComponent } from './hives.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data/data.service';
import { Hive } from 'src/shared/hive';

const activeHives: Partial<Hive>[] = [
  { id: '1', name: 'Alpha', archived: false },
  { id: '2', name: 'Beta', archived: false },
];
const archivedHives: Partial<Hive>[] = [{ id: '3', name: 'Old Hive', archived: true }];
const allHives = [...activeHives, ...archivedHives];

const mockDataService = {
  getActiveHives: jest.fn().mockResolvedValue(activeHives),
  getHives: jest.fn().mockResolvedValue(allHives),
  getArchivedHives: jest.fn().mockResolvedValue(archivedHives),
};

describe('HivesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HivesComponent],
      imports: [RouterTestingModule, TableModule, ButtonModule, NoopAnimationsModule],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  afterEach(() => jest.clearAllMocks());

  function createComponent() {
    const fixture = TestBed.createComponent(HivesComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the Hives heading', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading?.textContent).toContain('Hives');
  });

  it('loads active hives on init', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    expect(mockDataService.getActiveHives).toHaveBeenCalled();
  });

  it('shows all hives when viewAll is called', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    const component = fixture.componentInstance;
    await component.viewAll();
    expect(mockDataService.getHives).toHaveBeenCalled();
    expect(component.hives).toHaveLength(3);
  });

  it('shows archived hives when viewArchived is called', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    const component = fixture.componentInstance;
    component.viewArchived();
    await fixture.whenStable();
    expect(mockDataService.getArchivedHives).toHaveBeenCalled();
    expect(component.hives).toHaveLength(1);
  });
});
