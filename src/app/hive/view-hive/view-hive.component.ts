import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { Harvest } from 'src/shared/harvest';
import { Hive } from 'src/shared/hive';
import { InspectionNote } from 'src/shared/inspectionNote';

@Component({
  selector: 'app-view-hive',
  templateUrl: './view-hive.component.html',
  styleUrls: ['./view-hive.component.css']
})
export class ViewHiveComponent implements OnInit {
  private _router: Router = inject(Router)
  public id: string = '';
  hive: Hive = new Hive();
  notes: InspectionNote[] = [];
  harvests: Harvest[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}
  
  async ngOnInit() {
    let idInput = this.route.snapshot.paramMap.get('id');
    if(idInput != undefined && idInput != ''){
      this.id = idInput;

      await this.dataService.getHive(this.id).then((item) => this.hive = item);
      await this.dataService.getInspectionNotesByHive(this.id).then((item) => this.notes = item )
      await this.dataService.getHarvestsByHive(this.hive.id).then((item) => this.harvests=item);
      console.log(this.hive);
      console.log(this.notes);
    }
  }

  editHive(){
   this._router.navigate(['/hive/edit/', this.hive.id]) 
  }

  viewHarvest(id:string){
    this._router.navigate(['harvest/', id]);
  }
}
