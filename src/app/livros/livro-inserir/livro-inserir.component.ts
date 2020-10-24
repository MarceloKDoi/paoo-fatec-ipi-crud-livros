import { Component, EventEmitter, Output } from '@angular/core';
//import { Livro } from '../livro.model';
import { NgForm } from '@angular/forms';
import { LivroService } from '../livro.service';

@Component ({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent{
/*
  id: string;
  titulo: string;
  autor: string;
  paginas: string;

  @Output() livroAdicionado = new EventEmitter<Livro>();*/

  constructor (public livroService: LivroService){}

  onAdicionarLivro (form: NgForm){
    if (form.invalid)
      return;
    this.livroService.adicionarLivro(
      form.value.titulo,
      form.value.id,
      form.value.autor,
      form.value.paginas
    )
    form.resetForm()
  }
      /*
    const livro: Livro = {
      titulo: form.value.titulo,
      id: form.value.id,
      autor: form.value.autor,
      paginas: form.value.paginas
    }
    this.livroAdicionado.emit(livro);
    //console.log ("Inserindo livro...");
  }
/*
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
  }*/
}
