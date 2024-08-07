import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { remult } from 'remult';
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
  async ngOnInit(): Promise<void> {
   this.hives = await this.hiveRepo.find({where: {archived: false}}).then((items)=> this.hives = items);
   this.addHiveNote();
  }

  hiveRepo = remult.repo(Hive);
  inspectionRepo = remult.repo(Inspection);
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

    const newInspect = await this.inspectionRepo.insert({
      inspectionDate: this.inspectionForm.value['date'] as Date,
      notes: this.inspectionForm.value['note'] as string,
      //inspectionNotes: this.inspectionForm.value['hiveNotes'] as InspectionNote[]
    })

    hiveNotes.forEach(async (item) => {
      await this.inspectionRepo.relations(newInspect).inspectionNotes.insert(item)
    })


    console.log(newInspect)
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
