const express = require("express");
const router = express.Router();
const {createBrand,getBrands} = require("../controllers/brandController")

router.put("/",createBrand)
router.post("/",getBrands)
module.exports = router
export {}
