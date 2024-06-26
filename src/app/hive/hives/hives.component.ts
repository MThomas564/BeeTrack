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
  constructor(private router: Router) { } 
  showingAll: boolean = true;
  hiveRepo = remult.repo(Hive);
  hives: Hive[] = [];
  ngOnInit() {
    this.hiveRepo.find().then((items) => (this.hives = items))
  }

  viewHive(id:any){
    let link:string = '/hive/'+id;
    this.router.navigate([link]);
  }

  editHive(id:any){
    let link:string = '/hive/edit/'+id;
    this.router.navigate([link]);
  }

  viewAll(){
    this.hiveRepo.find().then((items) => (this.hives = items))
    this.showingAll = true;
  }

  viewArchived(){
    this.hiveRepo.find({where: {archived: true},}).then((items) => (this.hives= items))
    this.showingAll = false;
  }

  viewActive(){
    this.hiveRepo.find({where: {archived: false},}).then((items) => (this.hives= items))
    this.showingAll = false;
  }
}
