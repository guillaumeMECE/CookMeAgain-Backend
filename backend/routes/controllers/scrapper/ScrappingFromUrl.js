const bcrypt = require('bcrypt');
const { AuthModel, UserModel } = require('@models');
const { formatChecker } = require('@core');
const { AuthServices } = require('@services');


const rp = require('request-promise');
const $ = require('cheerio');
// const url = 'https://www.marmiton.org/recettes/recette_mayonnaise-au-thermomix_374847.aspx';
const url = '"https://www.marmiton.org/recettes/recette_papillotes-de-maquereaux-au-barbecue_57711.aspx"';

/**
 * Request structure
 */
// req = { body: { email: 'xxx', password: 'xxxxxxxxx' } }
// res = { json: { token: 'xxxx' } }

/**
 * SECURE : Params and Body
 */
const secure = async (req) => {

    const inputs = {};

    if (req.body.url === undefined || req.body.url === null) {
        throw new Error('Url undefined/null');
    }
    inputs.url = req.body.url;

    return inputs;
};

/**
 * PROCESS :
 */
const process = async (inputs) => {
    try {
        const output = {};

        const html = await rp(inputs.url);

        const rawTitle = $('h1', html).text(); // Name of the recipe
        output.title = rawTitle;

        const rawImg = $('#af-diapo-desktop-0_img', html).attr('src'); // Image path of the recipe
        output.img = rawImg;

        // TODO Remove invisible char
        const lengthOf_rawPreparationList = $('.recipe-preparation__list__item', html).length; // Preparation List of the recipe
        output.preparation_list=[];
        for (let id = 0; id < lengthOf_rawPreparationList; id++) {
            output.preparation_list.push($('.recipe-preparation__list__item', html)[id].children[0].data)
        }

        return output;
    } catch (error) {
        throw new Error('Error while scrapping'.concat(' > ', error.message));
    }
};

const scrappingFromUrl = async (req, res) => {
    try {
        const inputs = await secure(req);

        const output = await process(inputs);

        // res.cookie('token',token,{ expires: new Date(Date.now() + 9000000000000), httpOnly: true });
        res.status(200).json({ output });
    } catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
};

module.exports = scrappingFromUrl;
