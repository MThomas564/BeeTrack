import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { Hive } from 'src/shared/hive';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';

@Component({
    selector: 'app-edit-inspection',
    templateUrl: './edit-inspection.component.html',
    styleUrl: './edit-inspection.component.css',
    standalone: false
})
export class EditInspectionComponent implements OnInit {
  private _router: Router = inject(Router);
  public id: string = '';
  inspection: Inspection = new Inspection();
  hives: Hive[] = [];
  fb: FormBuilder = new FormBuilder();

  inspectionForm = this.fb.group({
    date: [new Date(), Validators.required],
    note: [''],
    hiveNotes: this.fb.array([])
  });

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    this.hives = await this.dataService.getHives();

    const idInput = this.route.snapshot.paramMap.get('id');
    if (idInput) {
      this.id = idInput;
      this.inspection = await this.dataService.getInspection(this.id);
      const notes = this.inspection.inspectionNotes as InspectionNote[];

      this.inspectionForm.patchValue({
        date: this.inspection.inspectionDate,
        note: this.inspection.notes
      });

      this.hiveForms.clear();
      for (const note of notes) {
        const matchingHive = this.hives.find(h => h.id === note.hive?.id) || note.hive;
        const hnForm = this.fb.group({
          hive: [matchingHive],
          notes: [note.notes],
          queen: [note.queen],
          eggs: [note.eggs],
          bias: [note.bias],
          swarmCells: [note.swarmCells],
          supercedureCells: [note.supercedureCells],
          noEggsOrBrood: [note.noEggsOrBrood]
        });
        this.hiveForms.push(hnForm);
      }
    }
  }

  get hiveForms() {
    return this.inspectionForm.controls['hiveNotes'] as FormArray;
  }

  async submit() {
    const hiveNotes: InspectionNote[] = this.inspectionForm.value['hiveNotes'] as InspectionNote[];
    this.inspection.inspectionDate = this.inspectionForm.value['date'] as Date;
    this.inspection.notes = this.inspectionForm.value['note'] as string;

    await this.dataService.updateInspection(this.inspection, hiveNotes);

    this._router.navigateByUrl('inspections');
  }

  addHiveNote() {
    const hnForm = this.fb.group({
      hive: [''],
      notes: [''],
      queen: [],
      eggs: [],
      bias: [],
      swarmCells: [],
      supercedureCells: [],
      noEggsOrBrood: []
    });
    this.hiveForms.push(hnForm);
  }

  removeHiveNote(hnIndex: number) {
    this.hiveForms.removeAt(hnIndex);
  }
}
