const XlsxStreamReader = require("xlsx-stream-reader");
const fs = require("fs");

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
      // do something with row 1 like save as column names
    } else {
      console.table(row.values);
      console.log(`Inserting ${row.values[4]}`);
      // đọc các cột và insert vào db ở đây
    }
  });
  workSheetReader.on("end", function () {
    // console.log(workSheetReader.rowCount);
  });

  // call process after registering handlers
  workSheetReader.process();
});
workBookReader.on("end", function () {
  // end of workbook reached
});

fs.createReadStream("./data.xlsx").pipe(workBookReader);
