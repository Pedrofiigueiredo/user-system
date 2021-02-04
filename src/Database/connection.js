const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/NodeRest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  
});

mongoose.Promise = global.Promise;

module.exports = mongoose;