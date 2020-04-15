const bcrypt = require('bcrypt');
const { AuthModel, UserModel } = require('@models');
const { formatChecker } = require('@core');
const { AuthServices } = require('@services');


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
    
    if (req.body.uid === undefined || req.body.uid === null) {
        throw new Error('Uid undefined/null');
    }
    inputs.uid = req.body.uid;

    return inputs;
};

/**
 * PROCESS :
 */
const process = async (inputs) => {
    try {
        const userUID = await UserModel.findOne({ uid: inputs.uid });
        console.log("USER UID : ",userUID);
        
         if (userUID === null || userUID === undefined) {
            await UserModel.create(inputs);
         }

        return userUID;
    } catch (error) {
        throw new Error('Error login'.concat(' > ', error.message));
    }
};

const SignInWithGoogle = async (req, res) => {
    try {
        const inputs = await secure(req);
        
        const token = await process(inputs);
        
        // res.cookie('token',token,{ expires: new Date(Date.now() + 9000000000000), httpOnly: true });
        res.status(200).json({token : token});
    } catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
};

module.exports = SignInWithGoogle;
