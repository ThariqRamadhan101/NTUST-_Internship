import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'report-problem', pathMatch: 'full' },
  // Uncomment to change to home page
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'maintenance-records', loadChildren: './maintenance-records/maintenance-records.module#MaintenanceRecordsPageModule' },
  { path: 'report-problem', loadChildren: './report-problem/report-problem.module#ReportProblemPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
