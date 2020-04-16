const bcrypt = require('bcrypt');
const { AuthModel, UserModel } = require('@models');
const { formatChecker } = require('@core');
const { AuthServices } = require('@services');
const {secureInput} = require('@core')


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

    // const inputs = {};

    if (req.body.url === undefined || req.body.url === null) {
        throw new Error('Url undefined/null');
    }
    // inputs.url = req.body.url;

    // return inputs;
};

/**
 * PROCESS :
 */
const process = async (req) => {
    try {
        const output = {};

        const html = await rp(req.body.url);

        const rawTitle = $('h1', html).text(); // Name of the recipe
        req.body.title = rawTitle;

        const rawImg = $('#af-diapo-desktop-0_img', html).attr('src'); // Image path of the recipe
        req.body.img = rawImg;

        // TODO Remove invisible char
        const lengthOf_rawPreparationList = $('.recipe-preparation__list__item', html).length; // Preparation List of the recipe
        req.body.preparation_list = [];
        for (let id = 0; id < lengthOf_rawPreparationList; id++) {
            req.body.preparation_list.push(secureInput.sanitizeString($('.recipe-preparation__list__item', html)[id].children[0].data))
        }

        const lengthOf_rawIngredientQt = $('.recipe-ingredient-qt', html).length; // Preparation List of the recipe
        const lengthOf_rawIngredient = $('.ingredient', html).length; // Preparation List of the recipe
        console.log(lengthOf_rawIngredientQt, " = ", lengthOf_rawIngredient);
        req.body.ingredients_list = [];
        if (lengthOf_rawIngredientQt === lengthOf_rawIngredient) {
            let rawQt;
            for (let id = 0; id < lengthOf_rawIngredientQt; id++) {
                if ($('.recipe-ingredient-qt', html)[id].children[0] === undefined) {
                    rawQt = "0";

                } else {
                    rawQt = $('.recipe-ingredient-qt', html)[id].children[0].data;
                }
                req.body.ingredients_list.push(
                    {
                        qt: rawQt,
                        ingredient: secureInput.sanitizeString($('.ingredient', html)[id].children[0].data)
                    });
            }
        }
        return req
    } catch (error) {
        throw new Error('Error while scrapping'.concat(' > ', error.message));
    }
};

const scrappingFromUrl = async (req, res,next) => {
    try {
        await secure(req);

        req = await process(req);

        next()
        // res.status(200).json({ output });
    } catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
};

module.exports = scrappingFromUrl;
