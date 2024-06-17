import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { Inspection } from 'src/shared/inspection';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {
  constructor(private router: Router) { } 
  inspections: Inspection[] = [];
  inspectionRepo = remult.repo(Inspection)

  async ngOnInit() {
    this.inspections = await this.inspectionRepo.find().then((items) => this.inspections = items)
    console.log(this.inspections)
  }

  viewInspection(id:any){
    let link:string = '/inspection/'+id;
    this.router.navigate([link]);
  }


}
