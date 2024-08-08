import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hive } from 'src/shared/hive';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-hive',
  templateUrl: './edit-hive.component.html',
  styleUrl: './edit-hive.component.css'
})
export class EditHiveComponent implements OnInit {
  public id: string = '';
  hive: Hive = new Hive();
  
  fb: FormBuilder = new FormBuilder();

  hiveForm = this.fb.group({
    name: [''],
    origin: [''],
    queenYear: [''],
    archived: [false]
  })

  constructor(private route: ActivatedRoute, private _location: Location, private dataService: DataService) {}
  
  async ngOnInit() {
    let idInput = this.route.snapshot.paramMap.get('id');
    if(idInput != undefined && idInput != ''){
      this.id = idInput;
      this.hive = await this.dataService.getHive(this.id);
      this.hiveForm.controls['name'].setValue(this.hive.name)
      this.hiveForm.controls['origin'].setValue(this.hive.origin)
      this.hiveForm.controls['queenYear'].setValue(this.hive.yearOfQueen)
      this.hiveForm.controls['archived'].setValue(this.hive.archived);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.hiveForm.valid) {
      if(this.hive){
        this.hive.name = this.hiveForm.controls['name'].value as string;
        this.hive.origin = this.hiveForm.controls['origin'].value as string;
        this.hive.yearOfQueen = this.hiveForm.controls['queenYear'].value as string;
        this.hive.archived = this.hiveForm.controls['archived'].value as boolean;
        await this.dataService.updateHive(this.hive);
        this._location.back();
      }
    }
  }
}
