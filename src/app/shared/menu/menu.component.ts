import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    standalone: false
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  darkMode = false;

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
    ];

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.darkMode = prefersDark;
    document.documentElement.classList.toggle('app-dark', prefersDark);
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('app-dark', this.darkMode);
  }
}
