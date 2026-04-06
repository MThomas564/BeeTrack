import { TestBed } from '@angular/core/testing';
import { remult } from 'remult';
import { InMemoryDataProvider } from 'remult';
import { DataService } from './data.service';
import { Hive } from 'src/shared/hive';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';
import { JarSale } from 'src/shared/jarSale';
import { Harvest } from 'src/shared/harvest';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    remult.dataProvider = new InMemoryDataProvider();

    TestBed.configureTestingModule({
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
  });

  afterEach(async () => {
    remult.dataProvider = new InMemoryDataProvider();
  });

  describe('Hives', () => {
    it('adds and retrieves a hive', async () => {
      await service.addHive({ name: 'Hive A', archived: false });
      const hives = await service.getHives();
      expect(hives).toHaveLength(1);
      expect(hives[0].name).toBe('Hive A');
    });

    it('returns hives sorted alphabetically', async () => {
      await service.addHive({ name: 'Zebra', archived: false });
      await service.addHive({ name: 'Apple', archived: false });
      const hives = await service.getHives();
      expect(hives[0].name).toBe('Apple');
      expect(hives[1].name).toBe('Zebra');
    });

    it('returns only active hives', async () => {
      await service.addHive({ name: 'Active Hive', archived: false });
      await service.addHive({ name: 'Archived Hive', archived: true });
      const active = await service.getActiveHives();
      expect(active).toHaveLength(1);
      expect(active[0].name).toBe('Active Hive');
    });

    it('returns only archived hives', async () => {
      await service.addHive({ name: 'Active Hive', archived: false });
      await service.addHive({ name: 'Archived Hive', archived: true });
      const archived = await service.getArchivedHives();
      expect(archived).toHaveLength(1);
      expect(archived[0].name).toBe('Archived Hive');
    });

    it('returns grouped hives with active and inactive sections', async () => {
      await service.addHive({ name: 'Active Hive', archived: false });
      await service.addHive({ name: 'Archived Hive', archived: true });
      const grouped = await service.getGroupedHives();
      expect(grouped).toHaveLength(2);
      expect(grouped[0].label).toBe('Active');
      expect(grouped[0].items).toHaveLength(1);
      expect(grouped[1].label).toBe('Inactive');
      expect(grouped[1].items).toHaveLength(1);
    });

    it('updates a hive', async () => {
      const hive = await service.addHive({ name: 'Old Name', archived: false });
      hive.name = 'New Name';
      await service.updateHive(hive);
      const updated = await service.getHive(hive.id);
      expect(updated.name).toBe('New Name');
    });
  });

  describe('Inspections', () => {
    it('adds and retrieves an inspection', async () => {
      const date = new Date('2024-06-01');
      await service.addInspection({ inspectionDate: date, notes: 'All good' });
      const inspections = await service.getInspections();
      expect(inspections).toHaveLength(1);
      expect(inspections[0].notes).toBe('All good');
    });

    it('adds inspection with hive notes', async () => {
      const hive = await service.addHive({ name: 'Test Hive', archived: false });
      const inspect: Partial<Inspection> = {
        inspectionDate: new Date('2024-06-01'),
        notes: 'Inspection notes',
      };
      const note: Partial<InspectionNote> = {
        hive: hive,
        notes: 'Hive note',
        queen: true,
      };
      const saved = await service.addInspectAndNotes(inspect, [note]);
      const fetched = await service.getInspection(saved.id);
      expect(fetched.inspectionNotes).toHaveLength(1);
      expect(fetched.inspectionNotes![0].queen).toBe(true);
    });

    it('deletes inspection and its notes', async () => {
      const hive = await service.addHive({ name: 'Test Hive', archived: false });
      const inspect = await service.addInspectAndNotes(
        { inspectionDate: new Date(), notes: '' },
        [{ hive, notes: 'Note' }]
      );

      const deleted = await service.deleteInspection(inspect.id);
      expect(deleted).toBe(true);

      const inspections = await service.getInspections();
      expect(inspections).toHaveLength(0);
    });
  });

  describe('Sales', () => {
    it('adds and retrieves jar sales', async () => {
      await service.addSale({ numberOfJars: 5, dateOfSale: new Date() });
      const sales = await service.getJarSales();
      expect(sales).toHaveLength(1);
      expect(sales[0].numberOfJars).toBe(5);
    });

    it('calculates total jars sold', async () => {
      await service.addSale({ numberOfJars: 5, dateOfSale: new Date() });
      await service.addSale({ numberOfJars: 3, dateOfSale: new Date() });
      const total = await service.getTotalJarsSold();
      expect(total).toBe(8);
    });

    it('deletes a sale', async () => {
      const sale = await service.addSale({ numberOfJars: 2, dateOfSale: new Date() });
      const deleted = await service.deleteSale(sale.id);
      expect(deleted).toBe(true);
      const sales = await service.getJarSales();
      expect(sales).toHaveLength(0);
    });
  });
});
