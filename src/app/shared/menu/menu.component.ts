import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Hives',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Inspections',
        routerLink: '/inspections',
        icon: 'pi pi-search'
      },
      {
        label: 'Harvests',
        routerLink: '/harvests',
        icon: 'pi pi-receipt'
      },
      {
        label: 'Sales',
        routerLink: '/sales',
        icon: 'pi pi-receipt'
      }
    ]

}
}
