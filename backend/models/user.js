const { Schema, model } = require('mongoose');

const name = 'User';

const attributes = {
    uid: {
        type: String,
        unique: true,
        required: true
    },
};

const options = {};

const UserSchema = new Schema(attributes, options);

const UserModel = model(name, UserSchema);

module.exports = UserModel;
