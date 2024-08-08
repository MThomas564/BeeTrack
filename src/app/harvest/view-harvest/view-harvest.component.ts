import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { Harvest } from 'src/shared/harvest';
import { Hive } from 'src/shared/hive';

@Component({
  selector: 'app-view-harvest',
  templateUrl: './view-harvest.component.html',
  styleUrl: './view-harvest.component.css'
})
export class ViewHarvestComponent implements OnInit {

  private _router: Router = inject(Router);

  public id: string = '';
  harvest: Harvest = new Harvest();
  hives: Hive[] = []

  constructor(private route:ActivatedRoute, private dataService:DataService){}

  async ngOnInit(): Promise<void> {
    let idInput = this.route.snapshot.paramMap.get('id');
    if(idInput != undefined && idInput != ''){
      this.id = idInput;

      await this.dataService.getHarvest(this.id).then((item) =>{
        this.harvest = item[0]
        this.hives = item[1]
      })
    }
    console.log(this.hives);
    console.log(this.harvest);
  }

  edit(){
    this._router.navigate(['/harvest/edit/', this.harvest.id]);
  }

}
