const { showMetaData_v3 } = require("../helpers/id3");
const { default: Axios } = require("axios");
module.exports = {
  getMetaData: async (req, res) => {
    try {
      const url = "http://localhost:5000/Anh-Con-No-Em-Quang-Dung.mp3";
      const options = {
        keepBackup: false,
      };

      const response = await Axios({
        url,
        method: "GET",
        responseType: "stream",
      });

      const meta = await showMetaData_v3(response.data, options);
      res.send({ data: meta });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getFromExcel: async (req, res) => {},
};
