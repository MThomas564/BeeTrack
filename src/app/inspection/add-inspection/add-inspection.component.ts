import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DataService } from 'src/app/services/data/data.service';
import { Hive } from 'src/shared/hive';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';

@Component({
    selector: 'app-add-inspection',
    templateUrl: './add-inspection.component.html',
    styleUrl: './add-inspection.component.css',
    standalone: false
})
export class AddInspectionComponent implements OnInit {
  private _router: Router = inject(Router)
  private _document: Document = inject(DOCUMENT)
  constructor(private dataService:DataService){}
  async ngOnInit(): Promise<void> {
    this.hives = await this.dataService.getActiveHives();
    this.addHiveNote({ scroll: false });
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

    var hiveNotes: InspectionNote[] = this.inspectionForm.value['hiveNotes'] as InspectionNote[]
    let inspect: Partial<Inspection> = {
      inspectionDate: this.inspectionForm.value['date'] as Date,
      notes: this.inspectionForm.value['note'] as string,
    }

    await this.dataService.addInspectAndNotes(inspect, hiveNotes)

    this._router.navigateByUrl('inspections')

  }

  addHiveNote({ scroll = true } = {}){
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
    if (scroll) {
      setTimeout(() =>
        this._document.documentElement.scrollTo({ top: this._document.documentElement.scrollHeight, behavior: 'smooth' })
      , 0);
    }
  }

  removeHiveNote(hnIndex: number){
    this.hiveForms.removeAt(hnIndex);
  }

}
