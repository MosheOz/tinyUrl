const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// get shorten url and redirect if url exists on DB
router.get("/:urlCode", async (req, res) => {
    try {
        // get url object from DB
        const urlObject = await Url.findOne({ urlCode: req.params.urlCode })

        // check if exists
        if (urlObject) {
            return res.redirect(urlObject.longUrl);
        }
        else {
            return res.status(404).json("No url found!");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

module.exports = router;