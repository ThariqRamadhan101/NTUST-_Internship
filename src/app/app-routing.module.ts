import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'form-data', pathMatch: 'full' },
  // Uncomment to change to home page
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'maintenance-records', loadChildren: './maintenance-records/maintenance-records.module#MaintenanceRecordsPageModule' },
  { path: 'report-problem', loadChildren: './report-problem/report-problem.module#ReportProblemPageModule' },
  { path: 'form-data', loadChildren: './form-data/form-data.module#FormDataPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
