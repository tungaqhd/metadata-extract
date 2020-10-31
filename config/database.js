const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/merge-excel-and-musics", {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
