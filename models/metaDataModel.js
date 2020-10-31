const mongoose = require("mongoose");
const metaDataSchema = mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  artists: {
    // type: [
    //     {
    //         name: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    type: String,
    // required: true,
  },
  lyric: {
    type: String,
    // required: true,
  },
  composer: {
    type: String,
    // required: true,
  },
  copyright: {
    type: String,
    // required: true,
  },
  genre: {
    type: String,
    // required: true,
  },
  years: {
    type: Number,
    // required: true,
  },
  complication: String,
  bpm: {
    type: Number,
    // required: true,
  },
  mediaKind: {
    type: String,
    // required: true,
  },
  time: {
    type: Number,
    // required: true,
  },
});

const metaData = mongoose.model("MetaData", metaDataSchema);
module.exports = metaData;
