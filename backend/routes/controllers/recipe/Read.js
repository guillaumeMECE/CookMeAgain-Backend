const { RecipeModel } = require('@models');
/**
 * Request structure
 * req = { body: { } }
 * res = { json: { } }
 */

/**
 * SECURE : Params and Body
 */
const secure = async (req) => {
    const inputs = {};

    if (req.body.userUID === undefined || req.body.userUID === null) {
        throw new Error('UserUID undefined/null');
    }
    inputs.userUID = req.body.userUID;


    return inputs;
};

/**
 * PROCESS :
 */
const process = async (inputs) => {
    try {
        const output = await RecipeModel.find({userUID:inputs.userUID}).exec();

        return output;
    } catch (error) {
        throw new Error('Recipies can\'t be Read'.concat(' > ', error.message));
    }
};

/**
 * LOGIC :
 */
const Read = async (req, res) => {
    try {
        const inputs = await secure(req);

        const output = await process(inputs);

        res.status(200).json(output);
    } catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
};
module.exports = Read;
