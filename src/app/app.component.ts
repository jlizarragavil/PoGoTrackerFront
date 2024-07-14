import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-chart-bar',
        command: () => this.router.navigate(['/home'])
      },
      {
        label: 'xpTracker',
        icon: 'pi pi-chart-bar',
        command: () => this.router.navigate(['/xp-tracker'])
      },
      {
        label: 'Catching calculator',
        icon: 'pi pi-calculator',
        command: () => this.router.navigate(['/catching-calculator'])
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        badge: '3'
      }
    ];
  }

}
