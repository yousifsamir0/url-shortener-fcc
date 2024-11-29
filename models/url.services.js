
const UrlModel = require('../models/url.model.js');

const findByOriginalURL = async (originalUrl) => {
    try {

        const url = await UrlModel.findOne({ original_url: originalUrl });
        return url;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}
const findByshortnedURL = async (shortnedURL) => {
    try {
        const url = await UrlModel.findOne({ short_url: shortnedURL });
        return url;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}

const createNewUrl = async (urlObject) => {
    try {

        const newUrl = new UrlModel(urlObject);
        await newUrl.save()
        return newUrl;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}

module.exports = {
    findByOriginalURL,
    createNewUrl,
    findByshortnedURL,
};