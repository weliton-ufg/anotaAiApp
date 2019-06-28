import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'lista/listagem', loadChildren: './lista/listagem/listagem.module#ListagemPageModule' },
  { path: 'lista/cadastro', loadChildren: './lista/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'compras', loadChildren: './compras/compras.module#ComprasPageModule' },
  { path: 'produto/cadastro', loadChildren: './produto/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'produto/listagem', loadChildren: './produto/listagem/listagem.module#ListagemPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'categoria/listagem', loadChildren: './categoria/listagem/listagem.module#ListagemPageModule' },
  { path: 'categoria/cadastro', loadChildren: './categoria/cadastro/cadastro.module#CadastroPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
