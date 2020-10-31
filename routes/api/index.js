const metaDataRouter = require("./metaDataRouter");
const uploadRouter = require("./uploadRouter");
module.exports = (app) => {
  app.use("/api/metaData", metaDataRouter);
  app.use("/api/upload", uploadRouter);
};
