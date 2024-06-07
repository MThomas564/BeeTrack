import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { remult } from 'remult';
import { Hive } from 'src/shared/hive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hives',
  templateUrl: './hives.component.html',
  styleUrls: ['./hives.component.css']
})
export class HivesComponent implements OnInit {
  private _router: Router = Inject(Router)
  hiveRepo = remult.repo(Hive);
  hives: Hive[] = [];
  ngOnInit() {
    this.hiveRepo.find().then((items) => (this.hives = items))
  }

  viewHive(id:any){
    let link:string = '/view/'+id;
    console.log(link);
    this._router.navigate([link]);
  }

}
