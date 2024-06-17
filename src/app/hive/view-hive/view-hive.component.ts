import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { remult } from 'remult';
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
  hiveRepo = remult.repo(Hive);
  inspectionNoteRepo = remult.repo(InspectionNote);
  hive: Hive = new Hive();
  notes: InspectionNote[] = [];

  constructor(private route: ActivatedRoute) {}
  
  async ngOnInit() {
    let idInput = this.route.snapshot.paramMap.get('id');
    if(idInput != undefined && idInput != ''){
      this.id = idInput;

      this.hive = await this.hiveRepo.find({where: { id: this.id,},}).then((item) => this.hive = item[0])
      this.notes = await this.inspectionNoteRepo.find({include:{inspection: true}, where: {hive: this.hive}, orderBy: {createdDate: "desc"}}).then((item) => this.notes = item )
      console.log(this.hive);
      console.log(this.notes);
    }
  }

  editHive(){
   this._router.navigate(['/hive/edit/', this.hive.id]) 
  }
}
