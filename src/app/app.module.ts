import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MenubarModule} from 'primeng/menubar'
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop'
import { CheckboxModule } from 'primeng/checkbox';
import{ ConfirmDialogModule} from 'primeng/confirmdialog'
import {MultiSelectModule} from 'primeng/multiselect'


import { ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HivesComponent } from './hive/hives/hives.component';
import { AddHiveComponent } from './hive/add-hive/add-hive.component';
import { InspectionsComponent } from './inspection/inspections/inspections.component';
import { ViewHiveComponent } from './hive/view-hive/view-hive.component';
import { AddInspectionComponent } from './inspection/add-inspection/add-inspection.component';
import { ViewInspectionComponent } from './inspection/view-inspection/view-inspection.component';
import { CommonModule } from '@angular/common';
import { EditHiveComponent } from './hive/edit-hive/edit-hive.component';
import { StatusTagComponent } from './shared/status-tag/status-tag.component';
import { ConfirmationService } from 'primeng/api';
import { DateFormatPipe } from './shared/date pipe/date-format.pipe';
import { TagModule} from 'primeng/tag'
import { DataService } from './services/data/data.service';
import { HarvestsComponent } from './harvest/harvests/harvests.component';
import { AddHarvestComponent } from './harvest/add-harvest/add-harvest.component';
import { ViewHarvestComponent } from './harvest/view-harvest/view-harvest.component';
import { EditHarvestComponent } from './harvest/edit-harvest/edit-harvest.component';

const routes: Routes = [ 
  { path: '', component: HivesComponent } // Home page route 
  , { path: 'add', component: AddHiveComponent } // About page route 
  , { path: 'hive/:id', component: ViewHiveComponent }
  , { path: 'hive/edit/:id', component: EditHiveComponent}
  , { path: 'inspections', component: InspectionsComponent } 
  , { path: 'addInspection', component: AddInspectionComponent }
  , { path: 'inspection/:id', component: ViewInspectionComponent }
  , { path: 'harvests', component: HarvestsComponent}
  , { path: 'addHarvest', component: AddHarvestComponent}
  , {path: 'harvest/:id', component: ViewHarvestComponent}
  , { path: 'harvest/edit/:id', component: EditHarvestComponent}
]; 

@NgModule({
  declarations: [AppComponent
    , MenuComponent
    , HivesComponent
    , AddHiveComponent
    , InspectionsComponent
    , ViewHiveComponent
    , AddInspectionComponent
    , ViewInspectionComponent
    , EditHiveComponent
    , StatusTagComponent
    , HarvestsComponent
    , AddHarvestComponent
    , DateFormatPipe
    , ViewHarvestComponent
    , EditHarvestComponent
  ],
  imports: [
    BrowserModule
    , CommonModule
    , HttpClientModule
    , FormsModule
    , RouterModule.forRoot(routes)
    , TableModule
    , MenubarModule
    , ButtonModule
    , InputTextModule
    , ReactiveFormsModule
    , CalendarModule
    , BrowserAnimationsModule
    , InputTextareaModule
    , DropdownModule
    , CardModule
    , DragDropModule
    , CheckboxModule
    , ConfirmDialogModule
    , TagModule
    ,MultiSelectModule
     ],
  providers: [ConfirmationService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
