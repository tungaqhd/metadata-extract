const { ID3v1, ID3v2, MP3 } = require("jamp3");

const id3v1 = new ID3v1();
const id3v2 = new ID3v2();
const options = {
  keepBackup: false,
};
let filepath = "./CoGaiVang.mp3";
const newTag = {
  title: "Cô Gái Vàng - Duy Khánh", // max length 30
  artist: "Duy Khánh", // max length 30
  album: "Album Duy Khánh", // max length 30
  year: "2020", // length 4
  comment: "D Comment", // max length 28 (v1.1) / 30 (v1.0)
  track: 5, // only in v1.1
  genreIndex: 1,
};

const tag_v2 = {
  frames: [
    {
      id: "TIT2",
      value: { text: "A title" },
      head: {
        encoding: "utf8",
      },
    },
    {
      id: "TALB",
      value: { text: "An album" },
      head: {
        encoding: "ucs2",
      },
    },
  ],
};
const options_v2 = {
  defaultEncoding: "utf8", // encoding used if not specified in frame header
  keepBackup: false, // keep a filename.mp3.bak copy of the original file
  paddingSize: 10, // add padding zeros between id3v2 and the audio (in bytes)
};
const version_v2 = 4; // version: 2 = v2.2; 3 = v2.3; 4 = v2.4

module.exports = {
  showMetaData_v1: async (filepath, options) => {
    const tagv1 = await id3v1.read(filepath, options);
    return tagv1;
  },

  showMetaData_v2: async (filepath, options) => {
    const tagv2 = await id3v2.read(filepath, options);
    return tagv2;
  },

  showMetaData_v3: async (stream, options) => {
    const tagv3 = await id3v2.readStream(stream, options);
    return tagv3;
  },

  deleteMetaData_v1: async (filepath, options) => {
    await id3v1.remove(filepath, options);
  },

  deleteMetaData_v2: async (filepath, options) => {
    await id3v2.remove(filepath, options);
  },

  writeMetaData_v1: async (filepath, tag, version, options) => {
    await id3v1.write(filepath, tag, version, options);
  },

  writeMetaData_v2: async (filepath, tag, version, options) => {
    await id3v2.write(filepath, tag, version, 0, options);
  },
};
