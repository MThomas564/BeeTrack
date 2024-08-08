import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data service/data-service.service';
import { Hive } from 'src/shared/hive';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';

@Component({
  selector: 'app-add-inspection',
  templateUrl: './add-inspection.component.html',
  styleUrl: './add-inspection.component.css'
})
export class AddInspectionComponent implements OnInit {
  private _router: Router = inject(Router)
  constructor(private dataService:DataService){}
  async ngOnInit(): Promise<void> {
    await this.dataService.getHives().then((items) => this.hives = items);
    this.addHiveNote();
  }

  hives: Hive[] = [];
  fb: FormBuilder = new FormBuilder();

  inspectionForm = this.fb.group({
    date: [new Date(), Validators.required],
    note: [''],
    hiveNotes: this.fb.array([])
  })

  get hiveForms(){
    return this.inspectionForm.controls["hiveNotes"] as FormArray;
  }

  async submit(){
    console.log(this.inspectionForm.value)

    var hiveNotes: InspectionNote[] = this.inspectionForm.value['hiveNotes'] as InspectionNote[]
    let inspect: Partial<Inspection> = {
      inspectionDate: this.inspectionForm.value['date'] as Date,
      notes: this.inspectionForm.value['note'] as string,
    }

    await this.dataService.addInspectAndNotes(inspect, hiveNotes)

    this._router.navigateByUrl('inspections')

  }

  addHiveNote(){
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
    this.hiveForms.push(hnForm)
  }

  removeHiveNote(hnIndex: number){
    this.hiveForms.removeAt(hnIndex);
  }

}
