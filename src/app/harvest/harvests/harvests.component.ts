import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { Harvest } from 'src/shared/harvest';

@Component({
  selector: 'app-harvests',
  templateUrl: './harvests.component.html',
  styleUrl: './harvests.component.css'
})
export class HarvestsComponent {
  constructor(private router: Router, private dataService:DataService) { } 
  harvests: Harvest[] = [];

  async ngOnInit() {
    await this.dataService.getHarvests().then((items) => this.harvests = items);
  }

  viewHarvest(id:any){
    let link:string = '/harvest/'+id;
    this.router.navigate([link]);
  }

}
