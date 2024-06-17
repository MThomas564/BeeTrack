import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { remult } from 'remult';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';

@Component({
  selector: 'app-view-inspection',
  templateUrl: './view-inspection.component.html',
  styleUrl: './view-inspection.component.css'
})
export class ViewInspectionComponent implements OnInit {
  public id: string = '';
  inspectionRepo = remult.repo(Inspection);
  inspection: Inspection = new Inspection()
  inspectionNotes: InspectionNote[] = [];

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    let idInput = this.route.snapshot.paramMap.get('id');
    if(idInput != undefined && idInput != ''){
      this.id = idInput;
      
      this.inspection = await this.inspectionRepo.find({where: {id : this.id}, include: {inspectionNotes: true}}).then((item) => this.inspection = item[0])
      this.inspectionNotes = this.inspection.inspectionNotes as InspectionNote[];
      console.log(this.inspection);
    }
  }
  }

  
