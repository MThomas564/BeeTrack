import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Hive } from 'src/shared/hive';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data service/data-service.service';

@Component({
  selector: 'app-add-hive',
  templateUrl: './add-hive.component.html',
  styleUrls: ['./add-hive.component.css']
})
export class AddHiveComponent implements OnInit {
  private _router: Router = inject(Router)
  fb: FormBuilder = new FormBuilder();

  hiveForm = this.fb.group({
    name: ['', Validators.required],
    origin: ['', Validators.required],
    queenYear: ['', Validators.required]
  })

  constructor(private dataService: DataService) {}

ngOnInit(): void {
  
}
async addHive(){
  try{ 
    let hive: Partial<Hive> = {
      name: this.hiveForm.value['name'] as string,
      origin: this.hiveForm.value['origin'] as string,
      yearOfQueen: this.hiveForm.value['queenYear'] as string
    }
    await this.dataService.addHive(hive);
    this._router.navigateByUrl('')
  }
  catch(error: any){
    alert(error.message);
  }
}
}
