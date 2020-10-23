import { Component, OnInit ,Input} from '@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

  @Input() livros: Livro [] = [];

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
  constructor() { }

  ngOnInit(): void {
  }

}
