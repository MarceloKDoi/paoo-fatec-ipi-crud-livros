import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable ({providedIn: "root"})

export class LivroService{

  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject <Livro[]>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){

  }

  getLivro (idLivro: string){
    return this.httpClient.get<{_id: string, titulo: string, autor: string, paginas: string}>(
      `http://localhost:3000/api/livros/${idLivro}`
    )
   /* let liv = this.livros.find((l) =>l.id === idLivro);
      return liv;
    return {...this.livros.find(l => l.id === idLivro)};*/

  }

  getLivros (): void{
    this.httpClient.get<{mensagem:string, livros: any}>('http://localhost:3000/api/livros').
    pipe(map((dados) => {
      return dados.livros.map((livro) => {
        return{

          id: livro._id,
          titulo: livro.titulo,
          autor: livro.autor,
          paginas: livro.paginas,

        }
      });
    })).
    subscribe((livros) => {
      this.livros = livros;
      this.listaLivrosAtualizada.next([...this.livros]);//push
    })
  //  return [...this.livros];
  }

  atualizarLivro (id: string, titulo: string, autor: string, paginas){
    const livro: Livro = {id,titulo,autor,paginas};
    this.httpClient.put(`http://localhost:3000/api/livros/${id}`, livro)
    .subscribe(res => {
      const copia = [...this.livros];
      const indice = copia.findIndex (liv => liv.id === livro.id);
      copia[indice] = livro;
      this.livros = copia;
      this.listaLivrosAtualizada.next([...this.livros]);
      this.router.navigate(['/']);
    });
  }

  adicionarLivro (titulo: string, autor: string, paginas: string, id: string): void{
    const livro: Livro = {

      id: null,
      titulo: titulo,
      autor: autor,
      paginas: paginas

    };
    //this.livros.push(livro);
    //this.listaLivrosAtualizada.next([...this.livros]);

    this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3000/api/livros', livro).subscribe((resposta) => {
      console.log(resposta.mensagem);
      livro.id = resposta.id;
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros]);
      this.router.navigate(['/']);

    });
  }

  removerLivro (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`)
    .subscribe(() => {
      this.livros = this.livros.filter((liv) =>{
        return liv.id !== id
      })
      this.listaLivrosAtualizada.next([...this.livros]);
    //  console.log(`Livro com id ${id} removido`)
    })
  }

  getListaLivrosAtualizada (){
    return this.listaLivrosAtualizada.asObservable();
  }
}
