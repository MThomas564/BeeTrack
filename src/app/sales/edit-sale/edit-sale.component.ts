import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { JarSale } from 'src/shared/jarSale';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrl: './edit-sale.component.css'
})
export class EditSaleComponent implements OnInit {
  public id: string = '';
  sale:JarSale = new JarSale();

  fb:FormBuilder = new FormBuilder();

  saleForm = this.fb.group({
    dateOfSale: [new Date()],
    numberOfJars: [0],
    notes:['']
  })

  constructor(private route: ActivatedRoute, private _location: Location, private dataService: DataService){}

  async ngOnInit(): Promise<void> {
    let idInput = this.route.snapshot.paramMap.get('id');
    if(idInput != undefined && idInput != ''){
      this.id = idInput;
      this.sale = await this.dataService.getJarSale(this.id);
      this.saleForm.controls['dateOfSale'].setValue(this.sale.dateOfSale as Date);
      this.saleForm.controls['numberOfJars'].setValue(this.sale.numberOfJars);
      this.saleForm.controls['notes'].setValue(this.sale.notes as string);
    }
  }

  async updateSale(){
    if (this.saleForm.valid){
      if(this.sale){
        this.sale.dateOfSale = this.saleForm.controls['dateOfSale'].value as Date;
        this.sale.notes = this.saleForm.controls['notes'].value as string;
        this.sale.numberOfJars = this.saleForm.controls['numberOfJars'].value as number;
        await this.dataService.updateSale(this.sale);
        this._location.back();
      }
    }
  }

}
