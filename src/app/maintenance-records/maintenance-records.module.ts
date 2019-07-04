import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaintenanceRecordsPage } from './maintenance-records.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceRecordsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MaintenanceRecordsPage]
})
export class MaintenanceRecordsPageModule {}
