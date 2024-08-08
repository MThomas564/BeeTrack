import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DataService } from 'src/app/services/data/data.service';
import { Inspection } from 'src/shared/inspection';
import { InspectionNote } from 'src/shared/inspectionNote';

@Component({
  selector: 'app-view-inspection',
  templateUrl: './view-inspection.component.html',
  styleUrl: './view-inspection.component.css'
})
export class ViewInspectionComponent implements OnInit {
  private _router: Router = inject(Router);
  public id: string = '';
  inspection: Inspection = new Inspection()
  inspectionNotes: InspectionNote[] = [];

  constructor(private route: ActivatedRoute, private confirmationService: ConfirmationService, private dataService: DataService) { }

  async ngOnInit(): Promise<void> {
    let idInput = this.route.snapshot.paramMap.get('id');
    if (idInput != undefined && idInput != '') {
      this.id = idInput;

      await this.dataService.getInspection(this.id).then((item) => this.inspection = item);
      this.inspectionNotes = this.inspection.inspectionNotes as InspectionNote[];
      console.log(this.inspection);
    }
  }

  // confirmDelete(event: Event) {
  //   this.confirmationService.confirm({
  //     target: event.target as EventTarget,
  //     message: 'Are you sure you want to delete this inspection?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptButtonStyleClass: "p-button-danger p-button-text",
  //     rejectButtonStyleClass: "p-button-text p-button-text",
  //     accept: () => {
  //       this.delete();
  //     }
  //   })
  // }

  // private async delete() {
  //   await this.inspectionRepo.delete(this.id,);
  //   this._router.navigateByUrl('inspections')
  // }

}


