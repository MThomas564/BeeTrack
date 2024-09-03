import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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

  constructor(private route: ActivatedRoute, private confirmationService: ConfirmationService, private dataService: DataService) { }

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
    this._router.navigate(['/harvests/edit/', this.harvest.id]);
  }

   confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this inspection?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      accept: () => {
        this.delete();
      }
    })
  }

   private async delete() {
    await this.dataService.deleteHarvest(this.id);
    this._router.navigateByUrl('harvests')
  }

}
