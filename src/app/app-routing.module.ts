import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './guards/authorized.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'spent',
    loadChildren: () =>
      import('./modules/spent/spent.module').then((m) => m.SpentModule),
    canMatch: [AuthorizedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canMatch: [AuthorizedGuard],
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./modules/category/category.module').then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestGuard],
  },
  // {
  //   path: 'e', loadChildren: () => import('./handlers/handlers.module').then(m => m.HandlersModule)
  // },
  // {
  //   path: '**', redirectTo: 'e/not-found'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
