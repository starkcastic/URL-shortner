const Url = require('../models/urlModel')
const UrlShortener = require('../utils/urlShortener')

// Basic server-side URL check. Frontend validation is just UX —
// the API itself must never trust client input.
function isValidUrl(value) {
    try {
        const parsed = new URL(value);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

class UrlController{
    static async shortenUrl(req, res){
        try{
            const {originalUrl} = req.body;
            if(!originalUrl) return res.status(400).json({message: 'URL is required'})
            if(!isValidUrl(originalUrl)) return res.status(400).json({message: 'Please provide a valid http/https URL'})

            let url = await Url.findOne({originalUrl});
            if(url){
                return res.json(url);
            }

            // Generate a short code, retrying on the rare chance of a collision
            // instead of letting Mongo's unique-index error bubble up as a 500.
            let shortUrl;
            let attempts = 0;
            do {
                shortUrl = UrlShortener.generateShortUrl();
                attempts++;

                if (attempts > 5) {
                    return res.status(500).json({
                        message: 'Could not generate unique short URL'
                    });
                }
            } while (await Url.findOne({ shortUrl }));

            // save to database
            url = new Url({
                originalUrl, shortUrl
            });

            await url.save();
            res.json(url);
        }
        catch(err){
            res.status(500).json({message : 'Server error : '+ err.message})
        }
    }
    static async redirectToOriginalUrl(req, res) {
        try {
            const { shortUrl } = req.params;
            const url = await Url.findOne({ shortUrl: shortUrl });
            if (!url) {
                return res.status(404).send('URL NOT FOUND');
            }
            //increase the count
            url.clicks += 1;
            await url.save();
            res.redirect(url.originalUrl);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = UrlController;