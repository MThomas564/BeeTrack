import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar'
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop'
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { MultiSelectModule } from 'primeng/multiselect'
import { AccordionModule} from 'primeng/accordion';
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
import { TagModule } from 'primeng/tag'
import { DataService } from './services/data/data.service';
import { HarvestsComponent } from './harvest/harvests/harvests.component';
import { AddHarvestComponent } from './harvest/add-harvest/add-harvest.component';
import { ViewHarvestComponent } from './harvest/view-harvest/view-harvest.component';
import { EditHarvestComponent } from './harvest/edit-harvest/edit-harvest.component';
import { AddSaleComponent } from './sales/add-sale/add-sale.component';
import { SalesComponent } from './sales/sales/sales.component';
import { EditSaleComponent } from './sales/edit-sale/edit-sale.component';

const routes: Routes = [
  { path: '', component: HivesComponent }
  , { path: 'hives/add', component: AddHiveComponent }
  , { path: 'hives/:id', component: ViewHiveComponent }
  , { path: 'hives/edit/:id', component: EditHiveComponent }
  , { path: 'inspections', component: InspectionsComponent }
  , { path: 'inspections/add', component: AddInspectionComponent }
  , { path: 'inspections/:id', component: ViewInspectionComponent }
  , { path: 'harvests', component: HarvestsComponent }
  , { path: 'harvests/add', component: AddHarvestComponent }
  , { path: 'harvests/:id', component: ViewHarvestComponent }
  , { path: 'harvests/edit/:id', component: EditHarvestComponent }
  , { path: 'sales', component: SalesComponent }
  , { path: 'sales/add', component: AddSaleComponent }
  , { path: 'sales/:id', component: EditSaleComponent}
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
    , SalesComponent
    , AddSaleComponent
    , EditSaleComponent
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
    , MultiSelectModule
    , AccordionModule
  ],
  providers: [ConfirmationService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
