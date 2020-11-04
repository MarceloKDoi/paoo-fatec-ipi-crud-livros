const mongoose = require ('mongoose');

const livroSchema = mongoose.Schema({
  id: {type: String, require:false},
  titulo: {type: String, required: false},
  autor: {type: String, required:false},
  paginas: {type: String, required:false, default:'0000000'}
});
module.exports = mongoose.model ('Livro', livroSchema);
