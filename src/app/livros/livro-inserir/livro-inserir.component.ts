import { Component, EventEmitter, Output } from '@angular/core';
import { from } from 'rxjs';
import { Livro } from '../livro.model';

@Component ({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent{

  id: string;
  titulo: string;
  autor: string;
  paginas: string;

  @Output() livroAdicionado = new EventEmitter<Livro>();
  onAdicionarLivro (){
    const livro: Livro = {
      titulo: this.titulo,
      id: this.id,
      autor: this.autor,
      paginas: this.paginas
    }
    this.livroAdicionado.emit(livro);
    //console.log ("Inserindo livro...");
  }
}
