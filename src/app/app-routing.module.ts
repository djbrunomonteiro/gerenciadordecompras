import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/account/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./views/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'vendas',
    loadChildren: () => import('./views/vendas/vendas.module').then( m => m.VendasPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./views/compras/compras.module').then( m => m.ComprasPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
