import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./views/produtos/produtos.module').then(
            (m) => m.ProdutosPageModule
          ),
      },
      {
        path: 'vendas',
        loadChildren: () =>
          import('./views/vendas/vendas.module').then(
            (m) => m.VendasPageModule
          ),
      },
      {
        path: 'compras',
        loadChildren: () =>
          import('./views/compras/compras.module').then(
            (m) => m.ComprasPageModule
          ),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/account/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: '**',
    redirectTo: '/authentication/404',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
