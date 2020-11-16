const express = require ('express');
const router = express.Router();
const Livro = require ('../models/livro');


router.post('', (req, res, next) => {
  const livro = new Livro ({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas,
    id: req.body.id

  });
  livro.save()
  .then((livroInserido) =>{
    console.log(`Inserção ok: ${livroInserido}`);
    res.status(201).json({
      mensagem:'Livro Inserido',
      id: livroInserido._id
    })
  })
  .catch((error) =>{
    console.log(`Inserção Falhou: ${error}`);
    res.status(404).json({
      mensagem: 'Livro não foi inserido'
    })
  })
});



router.get ('',(req, res, next) => {
  Livro.find()
  .then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: 'Tudo ok',
      livros: documents
    })
  })
  .catch((error) => {
    console.log ('Busca falhou:'+ error)
    res.status(404).json({
      mensagem: 'Falhou',
      livros: []
    })
  })
});

router.get('/:id', (req, res, next) =>{
  Livro.findById(req.params.id).then( liv => {
    if(liv)
      res.status(200).json(liv)
    else
      res.status(404).json({mensagem: "Livro não encontrado!"})
  })
})

//DELETE /api/livros/5f998a124381ae1ee15f8299
router.delete ('/:id' , (req, res, next) => {
  Livro.deleteOne({_id: req.params.id})
  .then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Livro removido"});
  })
 // console.log(req.params);
  res.status(200).end();
});

router.put ('/:idLivro' , (req,res, next) => {
  const livro = new Livro ({
    _id: req.params.idLivro,
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas
  });
  Livro.updateOne(
    {_id: req.params.idLivro},
    livro
  ).then(resultado =>{
    console.log("Atualizou:" + JSON.stringify(resultado))
    res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
  })
})

module.exports = router;
