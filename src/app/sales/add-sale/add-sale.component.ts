import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from 'remult';
import { DataService } from 'src/app/services/data/data.service';
import { JarSale } from 'src/shared/jarSale';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrl: './add-sale.component.css'
})
export class AddSaleComponent {
private _router: Router = inject(Router)
fb: FormBuilder = new FormBuilder();

saleForm = this.fb.group({
  dateOfSale: [new Date()],
  numberOfJars: [0],
  notes:['']
})

constructor(private dataService: DataService){}

async addSale(){
  try{
    await this.dataService.addSale(this.saleForm.value as Partial<JarSale>)
    this._router.navigateByUrl('/sales')
  }
  catch(error: any){
    alert(error.message);
  }
}

}

