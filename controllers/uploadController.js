// nhạc -> excel cập nhật
const XlsxStreamReader = require("xlsx-stream-reader");
const fs = require("fs");
const MetaData = require("../models/metaDataModel");
const { default: Axios } = require("axios");
const { showMetaData_v3 } = require("../helpers/id3");

const metaData = [
  "title",
  "artists",
  "lyric",
  "composer",
  "copyright",
  "genre",
  "years",
  "compilation",
  "bpm",
  "mediaKind",
  "time",
];
module.exports = {
  uploadExcel: async (req, res) => {
    let saveQueue = [];
    let heading = [];
    let result = [];
    const workBookReader = new XlsxStreamReader();
    workBookReader.on("error", function (error) {
      throw error;
    });

    workBookReader.on("worksheet", async function (workSheetReader) {
      if (workSheetReader.id > 1) {
        workSheetReader.skip();
        return;
      }
      workSheetReader.on("row", async function (row) {
        if (row.attributes.r == 1) {
          heading = row.values.map((val) => {
            val = val.toLowerCase();
            if (val === "media kind") {
              val = "mediaKind";
            }
            return val;
          });
        } else {
          const data = row.values.reduce((acc, curr, index) => {
            return {
              ...acc,
              [heading[index]]: curr,
            };
          }, {});
          saveQueue.push(MetaData({ ...data }).save());
          if (saveQueue.length > 50) {
            await Promise.all([saveQueue]);
            saveQueue = [];
          }
          result.push(data);
        }
      });
      workSheetReader.on("end", function () {
        // console.log(workSheetReader.rowCount);
      });
      // call process after registering handlers
      workSheetReader.process();
    });
    workBookReader.on("end", async function () {
      await Promise.all([saveQueue]);
      res.json({ result });
    });

    fs.createReadStream("./uploads/excel/data.xlsx").pipe(workBookReader);
  },
  uploadMusics: async (req, res) => {
    try {
      let saveQueue = [];
      const { musics } = req.files;
      let result = await Promise.all(
        musics.map(async (file) => {
          const url = "http://localhost:5000/" + file.originalname;
          const options = {
            keepBackup: false,
          };

          const response = await Axios({
            url,
            method: "GET",
            responseType: "stream",
          });

          const meta = await showMetaData_v3(response.data, options);
          const info = meta.frames.reduce((acc, curr, index) => {
            curr.title = curr.title.toLowerCase();
            if (curr.title === "copyright message") {
              curr.title = "copyright";
            } else if (curr.title == "media kind") {
              curr.title = "mediaKind";
            }
            return {
              ...acc,
              [curr.title]: curr.value.text,
            };
          }, {});
          saveQueue.push(MetaData({ ...info }).save());
          if(saveQueue.length > 50) {
            await Promise.all([...saveQueue]);
            saveQueue = [];
          }
          return info;
        })
      );
      await Promise.all([...saveQueue]);
      res.json({ result });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};
