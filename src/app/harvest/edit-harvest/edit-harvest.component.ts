import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { Harvest } from 'src/shared/harvest';
import { Hive } from 'src/shared/hive';

@Component({
  selector: 'app-edit-harvest',
  templateUrl: './edit-harvest.component.html',
  styleUrl: './edit-harvest.component.css'
})
export class EditHarvestComponent implements OnInit {

  private _router: Router = inject(Router);

  public id: string = '';
  harvest: Harvest = new Harvest();
  selectedHives: Hive[] = [];
  hives: Hive[] = [];

  fb: FormBuilder = new FormBuilder();
  harvestForm: FormGroup;

  constructor(private route: ActivatedRoute, private dataService: DataService) {

    this.harvestForm = this.fb.group({
      notes: [''],
      collectedDate: [new Date()],
      jarDate: [new Date()],
      frameCount: [0],
      poundsCollected: [0],
      jars: [0],
      hives: new FormControl<Hive[]>([])
    })
  }

  async ngOnInit(): Promise<void> {
    await this.loadHives();
    await this.loadHarvest();
  }

  private async loadHives() {
    await this.dataService.getHives().then((item) => this.hives = item);
  }
  private async loadHarvest(): Promise<void> {
    const idInput = this.route.snapshot.paramMap.get('id');
    if (idInput) {
      this.id = idInput;
      const [harvest, selectedHives] = await this.dataService.getHarvest(this.id);
      this.harvest = harvest;
      this.selectedHives = selectedHives;

      this.harvestForm.patchValue({
        collectedDate: this.harvest.collectedDate,
        notes: this.harvest.notes,
        jarDate: this.harvest.jarDate,
        frameCount: this.harvest.frameCount,
        poundsCollected: this.harvest.poundsCollected,
        jars: this.harvest.jars
      });

      this.setHiveControlValue(this.selectedHives);
    }
  }

  private setHiveControlValue(hives: Hive[]): void {
    // Ensure the form control value is properly set
    if (hives && Array.isArray(hives)) {
      this.harvestForm.controls['hives'].setValue(hives);
    } else {
      console.warn('Selected hives data is not an array:', hives);
    }
  }


  async editHarvest() {
    this.harvest.collectedDate = this.harvestForm.controls['collectedDate'].value;
    this.harvest.notes = this.harvestForm.controls['notes'].value;
    this.harvest.jarDate = this.harvestForm.controls['jarDate'].value;
    this.harvest.frameCount = this.harvestForm.controls['frameCount'].value;
    this.harvest.poundsCollected = this.harvestForm.controls['poundsCollected'].value;
    this.harvest.jars = this.harvestForm.controls['jars'].value;

    await this.dataService.updateHarvest(this.harvest, this.harvestForm.value['hives'])

    this._router.navigate(['/harvest/', this.harvest.id]);

  }

}
