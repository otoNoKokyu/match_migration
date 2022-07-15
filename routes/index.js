const express = require("express")
const router = express.Router()
const {f1toSimu} = require("./f1")
const {f9toSimu} = require("./f9toSimulate.js")

router.post("/f1toSimulate", f1toSimu)
router.post("/f9toSimulate", f9toSimu)


module.exports = router
