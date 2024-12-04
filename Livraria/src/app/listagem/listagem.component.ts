import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResumoTextoPipe } from '../resumotexto.pipe'; // Corrija o caminho conforme necessário

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ResumoTextoPipe], // Importe o pipe corretamente
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],
})
export class ListagemComponent implements OnInit {
  livros: any[] = [];
  titulo: string = '';
  page: number = 1;
  totalPages: number = 0; // Inicializa com um valor padrão

  constructor(private livroService: LivroService, private router: Router) {}

  ngOnInit() {
    this.buscarLivros();
  }

  buscarLivros(): void {
    this.livroService.buscarLivros(this.titulo, this.page).subscribe(
      (data: any) => {
        console.log('Dados retornados:', data); // Verifique os dados retornados
        if (data && data.docs) {
          console.log('Livros encontrados:', data.docs); // Adicione este log
          this.livros = data.docs; // Exibir todos os livros
          this.totalPages = Math.ceil(data.numFound / 15);
        } else {
          console.error('Dados não possuem o formato esperado:', data);
        }
      },
      (error) => {
        console.error('Erro ao buscar livros:', error); // Verifique se há algum erro
      }
    );
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.buscarLivros();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.buscarLivros();
    }
  }

  getAutores(livro: any): string {
    if (livro && livro.author_name) {
      return livro.author_name.join(', ');
    }
    return 'Autores não disponíveis';
  }

  irParaHome() {
    this.router.navigate(['/home']);
  }

  irParaDetalhes(livroKey: string) {
    this.router.navigate(['/detalhes', livroKey]);
  }
}