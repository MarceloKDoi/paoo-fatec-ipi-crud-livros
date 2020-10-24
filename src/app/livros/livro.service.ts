import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
@Injectable ({providedIn: "root"})

export class LivroService{

  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject <Livro[]>();
  getLivros (): Livro[]{
    return [...this.livros];
  }

  adicionarLivro (titulo: string, id: string, autor: string, paginas: string): void{
    const livro: Livro = {
      titulo: titulo,
      id: id,
      autor: autor,
      paginas: paginas
    }
    this.livros.push(livro);
    this.listaLivrosAtualizada.next([...this.livros]);
    //console.log(this.livros);
  }

  getListaLivrosAtualizada (){
    return this.listaLivrosAtualizada.asObservable();
  }
}
