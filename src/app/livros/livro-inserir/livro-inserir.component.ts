import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { Livro } from '../livro.model';
import { FormGroup,FormControl,Validator,NgForm, Validators } from '@angular/forms';
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
  public estaCarregando: boolean = false;
  form: FormGroup;

  ngOnInit(){
    this.form = new FormGroup({

        titulo: new FormControl (null, {validators: [Validators.required, Validators.minLength(2)]}),
        autor: new FormControl (null, {validators: [Validators.required]}),
        paginas: new FormControl (null, {validators: [Validators.required, ]})

      }
    )
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('idLivro')){
        this.modo = "editar";
        this.idLivro = paramMap.get('idLivro');
        this.estaCarregando =true;
        this.livroService.getLivro(this.idLivro).subscribe(dadosLiv =>{
          this.estaCarregando = false;
          this.livro = {
            id: dadosLiv._id,
            titulo: dadosLiv.titulo,
            autor: dadosLiv.autor,
            paginas: dadosLiv.paginas
          }
          this.form.setValue({
            titulo: this.livro.titulo,
            autor: this.livro.autor,
            paginas: this.livro.paginas
          })
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

  onSalvarLivro (){
    if (this.form.invalid)
      return;

    this.estaCarregando =true;
    if (this.modo === "criar"){

      this.livroService.adicionarLivro(

        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.paginas,
        this.form.value.id

      )
    }
    else{
      this.livroService.atualizarLivro(
        this.idLivro,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.paginas
      )
    }

    this.form.reset()
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
