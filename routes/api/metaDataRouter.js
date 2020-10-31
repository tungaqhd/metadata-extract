const express = require('express');
const { getMetaData } = require('../../controllers/metaDataControllers');

const router = express.Router();

router
  .route('/')
  .get(getMetaData)

module.exports = router;