import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HivesComponent } from './hives/hives.component';
import { AddHiveComponent } from './add-hive/add-hive.component';
import { InspectionsComponent } from './inspections/inspections.component';
import { ViewHiveComponent } from './view-hive/view-hive.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [ 
  { path: '', component: HivesComponent }, // Home page route 
  { path: 'add', component: AddHiveComponent } // About page route 
  ,{path: 'hive/:id', component: ViewHiveComponent}
]; 

@NgModule({
  declarations: [AppComponent, HivesComponent, AddHiveComponent, InspectionsComponent, ViewHiveComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes), NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
