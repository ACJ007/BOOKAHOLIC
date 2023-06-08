const express = require("express")
const router = express.Router()
const path = require("path")

router.use(express.static(path.join(__dirname, "/Public/user")))
router.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/Public/user/index.html"))
})

module.exports = router;