const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const config = require("config");
const shortid = require("shortid");
const Url = require("../models/Url");

// generate short url 
router.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get("baseUrl");

    // validate base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("invalid base url!")
    }

    // validate original url
    if (validUrl.isUri(longUrl)) {
        try {
            // check if url already in DB
            let url = await Url.findOne({ longUrl })

            // if original url already exists in DB
            if (url) {
                res.json(url)
            }
            else {
                // generate short id for url code
                let urlCode = await isUrlCodeExists();
                const shortUrl = baseUrl + '/' + urlCode;

                // create new url object
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                // store on DB
                await url.save();
                res.json(url);
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    }
    else {
        res.status(401).json('Invalid long url');
    }
});

// get long url 
router.post("/long-url", async (req, res) => {
    const { shortUrl } = req.body;

    // validate short url
    if (validUrl.isUri(shortUrl)) {
        try {
            // check if url exists in DB
            let url = await Url.findOne({ shortUrl })

            // if long url exists in DB
            if (url) {
                res.json(url)
            }
            else {
                res.status(404).json("No url found")
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    }
    else {
        res.status(401).json('Invalid short url');
    }
 })

// generate unique code and make sure it doesn't exists on DB
let isUrlCodeExists = async () => {
    // generate random code
    let urlCode = shortid.generate();

    // check if code exists on DB
    let code = await Url.findOne({ urlCode });

    // if exists, than generate a new code again
    if (code) {
        isUrlCodeExists();
    }

    // return code generated
    return urlCode;
}

module.exports = router;