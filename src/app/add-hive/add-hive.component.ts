import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { remult } from 'remult';
import { Hive } from 'src/shared/hive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hive',
  templateUrl: './add-hive.component.html',
  styleUrls: ['./add-hive.component.css']
})
export class AddHiveComponent {
  private _router: Router = inject(Router)
  hiveName = "";
  hiveOrigin = "";
hiveRepo = remult.repo(Hive);
async addHive(){
  try{ 
    const newHive = await this.hiveRepo.insert({name: this.hiveName, origin: this.hiveOrigin})
    this._router.navigateByUrl('')
  }
  catch(error: any){
    alert(error.message);
  }
}
}
