import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LivroService } from '../livro.service';
import { HttpClient } from '@angular/common/http';
import { HighlightDirective } from './highlight.directive';

interface Livro {
  title: string;
  author_name?: string[];
  cover_i?: number;
  key: string;
  first_publish_year?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HighlightDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  titulo: string = ''; 
  loading: boolean = true;
  livros: Livro[] = [];

  constructor(private livroService: LivroService, private http: HttpClient) {}

  ngOnInit() {
    this.buscarLivros();
  }

  buscarLivros(): void {
    const apiURL = 'https://openlibrary.org/subjects/programming.json?limit=100';
    this.http.get(apiURL).subscribe(
      (data: any) => {
        const livrosFiltrados = data.works.filter((livro: any) => livro.title && livro.authors && livro.authors.length > 0 && livro.cover_id);
        const livrosAleatorios: Livro[] = this.getLivrosAleatorios(livrosFiltrados, 3).map((livro: any) => {
          return {
            title: livro.title,
            author_name: livro.authors.map((author: any) => author.name),
            cover_i: livro.cover_id,
            key: livro.key,
            first_publish_year: livro.first_publish_year
          };
        });
        this.livros = livrosAleatorios;
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao buscar livros:', error);
        this.loading = false;
      }
    );
  }

  getLivrosAleatorios(livros: any[], quantidade: number): Livro[] {
    const livrosAleatorios: Livro[] = [];
    while (livrosAleatorios.length < quantidade) {
      const livro = livros[Math.floor(Math.random() * livros.length)];
      if (!livrosAleatorios.includes(livro)) {
        livrosAleatorios.push(livro);
      }
    }
    return livrosAleatorios;
  }

  getAutores(livro: Livro): string {
    return livro.author_name ? livro.author_name.join(', ') : 'Autor não disponível';
  }
}
