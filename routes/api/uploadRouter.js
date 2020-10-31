// id bai hat
const express = require("express");
const router = express.Router();

const multer = require("multer");
const uploadExcelMiddleware = multer({
  storage: multer.diskStorage({
    destination: "./uploads/excel",
    filename: function (req, file, cb) {
      cb(null, "data.xlsx");
    },
  }),
}).fields([{ name: "excel", maxCount: 1 }]);
const uploadMusicsMiddleware = multer({
  storage: multer.diskStorage({
    destination: "./uploads/musics",
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}-${Date.now()}.mp3`);
    },
  }),
}).fields([{ name: "musics", maxCount: 10 }]);

const {
  uploadExcel,
  uploadMusics,
} = require("../../controllers/uploadController");

router.route("/excel").post(uploadExcelMiddleware, uploadExcel);
router.route("/musics").post(uploadMusicsMiddleware, uploadMusics);
module.exports = router;
