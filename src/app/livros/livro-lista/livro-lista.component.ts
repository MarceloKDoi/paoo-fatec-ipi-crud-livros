import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

  livros: Livro[] = [];
  private livroSubscription: Subscription;


  constructor(public livroService: LivroService) { }

  ngOnInit(): void {
    this.livros = this.livroService.getLivros();
    this.livroSubscription = this.livroService.getListaLivrosAtualizada()
    .subscribe((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  ngOnDestroy (): void {
    this.livroSubscription.unsubscribe();
  }


  /* @Input() livros: Livro [] = [];*/
 /* livros = [
    {
      titulo: 'The Maze Runner',
      id: 'E-0001',
      autor: 'James Dashner',
      paginas: '372'
    },
    {
      titulo: 'The Scorsh Trials',
      id: 'E-0002',
      autor: 'James Dashner',
      paginas: '360'
    },
    {
      titulo: 'The Death Cure',
      id: 'E-0003',
      autor: 'James Dashner',
      paginas: '325'
    }
  ]*/


}
