import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { Livro } from '../livro.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LivroService } from '../livro.service';
import {Livro } from '../livro.model';
@Component ({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css']
})

export class LivroInserirComponent implements OnInit{

  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('idLivro')){
        this.modo = "editar";
        this.idLivro = paramMap.get('idLivro');
        this.livroService.getLivro(this.idLivro).subscribe(dadosLiv =>{
          this.livro = {
            id: dadosLiv._id,
            titulo: dadosLiv.titulo,
            autor: dadosLiv.autor,
            paginas: dadosLiv.paginas
          }
        });
      }
      else{

        this.modo = "criar";
        this.idLivro = null;
      }
    })
  }

  constructor (
    private livroService: LivroService,
    private route: ActivatedRoute
    ){}

  onSalvarLivro (form: NgForm){
    if (form.invalid)
      return;

    if (this.modo === "criar"){

      this.livroService.adicionarLivro(

        form.value.titulo,
        form.value.autor,
        form.value.paginas,
        form.value.id

      )
    }
    else{
      this.livroService.atualizarLivro(
        this.idLivro,
        form.value.titulo,
        form.value.autor,
        form.value.paginas
      )
    }

    form.resetForm()
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
