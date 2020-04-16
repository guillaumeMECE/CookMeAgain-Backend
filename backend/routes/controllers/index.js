/* eslint-disable global-require */

module.exports = {

    SignInWithGoogle: require('./auth/SignInWithGoogle'),

    // Recipe handlers
    CreateRecipe: require('./recipe/Create'),
    ReadRecipe: require('./recipe/Read'),
    ReadOneRecipe: require('./recipe/ReadOne'),

    ScrappingFromUrl:require('./scrapper/ScrappingFromUrl')
};
