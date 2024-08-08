import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data service/data-service.service';
import { Inspection } from 'src/shared/inspection';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {
  constructor(private router: Router, private dataService:DataService) { } 
  inspections: Inspection[] = [];

  async ngOnInit() {
    await this.dataService.getInspections().then((items) => this.inspections = items);
    console.log(this.inspections)
  }

  viewInspection(id:any){
    let link:string = '/inspection/'+id;
    this.router.navigate([link]);
  }


}
