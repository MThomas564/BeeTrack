import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Validators, remult } from 'remult';
import { Location } from '@angular/common';
import { Hive } from 'src/shared/hive';

@Component({
  selector: 'app-edit-hive',
  templateUrl: './edit-hive.component.html',
  styleUrl: './edit-hive.component.css'
})
export class EditHiveComponent implements OnInit {
  public id: string = '';
  hiveRepo = remult.repo(Hive);
  hive: Hive = new Hive();
  
  fb: FormBuilder = new FormBuilder();

  hiveForm = this.fb.group({
    name: [''],
    origin: [''],
    queenYear: [''],
    archived: [false]
  })

  constructor(private route: ActivatedRoute, private _location: Location) {}
  
  async ngOnInit() {
    let idInput = this.route.snapshot.paramMap.get('id');
    if(idInput != undefined && idInput != ''){
      this.id = idInput;
      this.hive = await this.hiveRepo.find({where: { id: this.id,},}).then((item) => this.hive = item[0])
      this.hiveForm.controls['name'].setValue(this.hive.name)
      this.hiveForm.controls['origin'].setValue(this.hive.origin)
      this.hiveForm.controls['queenYear'].setValue(this.hive.yearOfQueen)
      this.hiveForm.controls['archived'].setValue(this.hive.archived);
    }
  }

  onSubmit(): void {
    if (this.hiveForm.valid) {
      if(this.hive){
        this.hive.name = this.hiveForm.controls['name'].value as string;
        this.hive.origin = this.hiveForm.controls['origin'].value as string;
        this.hive.yearOfQueen = this.hiveForm.controls['queenYear'].value as string;
        this.hive.archived = this.hiveForm.controls['archived'].value as boolean;
        this.hiveRepo.save(this.hive);
        this._location.back();
      }
    }
  }
}
