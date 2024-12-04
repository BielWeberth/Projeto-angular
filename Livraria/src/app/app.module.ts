import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ListagemComponent } from './listagem/listagem.component'; // Importe ListagemComponent


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ListagemComponent // Importe ListagemComponent aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
