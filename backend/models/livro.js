const mongoose = require ('mongoose');

const livroSchema = mongoose.Schema({

  titulo: {type: String, required: false},
  autor: {type: String, required:false},
  paginas: {type: String, required:false, default:'0000000'},
  id: {type: String, require:false}
});
module.exports = mongoose.model ('Livro', livroSchema);
