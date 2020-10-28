const mongoose = require ('mongoose');

const livroSchema = mongoose.Schema({
  titulo: {type: String, required: true},
  id: {type: String, required: true},
  autor: {type: String, required:true},
  paginas: {type: String, required:false, default:'0000000'}
});
module.exports = mongoose.model ('Livro', livroSchema);
