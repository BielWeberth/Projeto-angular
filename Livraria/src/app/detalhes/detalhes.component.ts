import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  livroDetalhes: any = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private livroService: LivroService
  ) {}

  ngOnInit() {
    const livroKey = this.route.snapshot.paramMap.get('key');
    console.log('Livro Key:', livroKey);
    if (livroKey) {
      this.livroService.getDetalhes(livroKey).subscribe(
        (data: any) => {
          console.log('Detalhes do livro recebidos:', data);
          this.livroDetalhes = data;
          this.logDadosLivro(); // Adiciona logs dos dados do livro
        },
        (error) => {
          console.error('Erro ao buscar detalhes do livro:', error);
        }
      );
    } else {
      console.error('Livro key não encontrado na rota.');
    }
  }

  logDadosLivro() {
    console.log('Título:', this.livroDetalhes.title);
    console.log('Autores:', this.getAutores());
    console.log('Covers:', this.livroDetalhes.covers);
    console.log('Sinopse:', this.livroDetalhes.description);
  }

  getAutores(): string {
    const autores = this.livroDetalhes && this.livroDetalhes.authors ? 
      this.livroDetalhes.authors.map((author: any) => author.name).join(', ') : 'Autores não disponíveis';
    console.log('Autores:', autores);
    return autores;
  }

  irParaHome() {
    this.router.navigate(['/home']);
  }

  irParaListagem() {
    this.router.navigate(['/listagem']);
  }
}
