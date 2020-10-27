import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable ({providedIn: "root"})

export class LivroService{

  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject <Livro[]>();

  constructor(private httpClient: HttpClient){

  }

  getLivros (): void{
    this.httpClient.get<{mensagem:string, livros: Livro[]}>('http://localhost:3000/api/livros').subscribe((dados) => {
      this.livros = dados.livros;
      this.listaLivrosAtualizada.next([...this.livros]);//push
    })
  //  return [...this.livros];
  }

  adicionarLivro (titulo: string, id: string, autor: string, paginas: string): void{
    const livro: Livro = {
      titulo: titulo,
      id: id,
      autor: autor,
      paginas: paginas
    };
    this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/livros', livro).subscribe((resposta) => {
      console.log(resposta.mensagem);
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros]);
    });
  }

  getListaLivrosAtualizada (){
    return this.listaLivrosAtualizada.asObservable();
  }
}
