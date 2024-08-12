import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hive } from 'src/shared/hive';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-hives',
  templateUrl: './hives.component.html',
  styleUrls: ['./hives.component.css']
})
export class HivesComponent implements OnInit {
  constructor(private router: Router, private dataService:DataService) { } 
  showingAll: boolean = true;
  hives: Hive[] = [];
  async ngOnInit() {
    await this.viewActive();
  }

  viewHive(id:any){
    let link:string = '/hives/'+id;
    this.router.navigate([link]);
  }

  editHive(id:any){
    let link:string = '/hives/edit/'+id;
    this.router.navigate([link]);
  }

  async viewAll(){
    await this.dataService.getHives().then((items) => (this.hives = items))
    this.showingAll = true;
  }

  viewArchived(){
    this.dataService.getArchivedHives().then((items) => (this.hives= items))
    this.showingAll = false;
  }

  viewActive(){
    this.dataService.getActiveHives().then((items) => (this.hives= items))
    this.showingAll = false;
  }
}
