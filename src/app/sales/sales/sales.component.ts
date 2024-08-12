import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { JarSale } from 'src/shared/jarSale';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {

  sales: JarSale[] = [];
  totalJars: number = 0;

  constructor(private dataService: DataService){}
  
  async ngOnInit(): Promise<void> {
    await this.dataService.getJarSales().then((item ) => this.sales = item);
    await this.dataService.getTotalJarsSold().then((item) => {this.totalJars += item; console.log(item)});
  }

}
