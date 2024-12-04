import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { HomeComponent } from './home/home.component'; // Importe o componente de Home
import { DetalhesComponent } from './detalhes/detalhes.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirecione para a página inicial
  { path: 'home', component: HomeComponent }, // Defina a rota para a página inicial
  { path: 'listagem', component: ListagemComponent },
  { path: 'detalhes/:key', component: DetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
