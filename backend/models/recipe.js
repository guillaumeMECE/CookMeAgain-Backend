
const { Schema, model } = require('mongoose');

const name = 'Recipe';

// TODO: ObjectID check type for userID & questionID
const attributes = {
    ingredients_list:
    {
        type: [{qt:String, ingredient:String}]
    },
    preparation_list: {
        type: [String],
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    userUID: {
        type: String
    }

};

const options = {};

const RecipeSchema = new Schema(attributes, options);

const RecipeModel = model(name, RecipeSchema);

module.exports = RecipeModel;
