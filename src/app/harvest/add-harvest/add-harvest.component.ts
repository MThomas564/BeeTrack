import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { Harvest } from 'src/shared/harvest';
import { Hive } from 'src/shared/hive';

@Component({
  selector: 'app-add-harvest',
  templateUrl: './add-harvest.component.html',
  styleUrl: './add-harvest.component.css'
})
export class AddHarvestComponent implements OnInit {
  private _router:Router = inject(Router);
  fb: FormBuilder = new FormBuilder();
  hives: Hive[] = [];

  harvestForm = this.fb.group({
    notes: [''],
    collectedDate: [],
    jarDate: [],
    frameCount: [0],
    poundsCollected: [0],
    jars: [0],
    hives: new FormControl<Hive[]>([])
  })

  constructor(private dataService: DataService){}

  ngOnInit():void{
    this.loadHives();
  }

  private async loadHives(){
    await this.dataService.getHives().then((items) => this.hives = items);
  }


  async addHarvest(){
    const harvest: Partial<Harvest> = this.harvestForm.value as Harvest;
    console.log(harvest);
    let selectHives = this.harvestForm.value['hives']
    await this.dataService.addHoneyHarvest(harvest, this.harvestForm.value['hives'] as Hive[]);
    this._router.navigateByUrl('harvests');
  }

}
