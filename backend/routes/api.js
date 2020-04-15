
const { Router } = require('express');

const router = Router();

/**
 * Middlewares imports
 */

/**
 * Controllers imports
 */
// Ashtray IMPORT
const { ReadAshtray, ReadOneAshtray, CreateAshtray, DeleteAshtray, ResetAshtray, UpdateAshtray } = require('@controllers');

// AUTH IMPORT
const { SignInWithGoogle, LoginUser } = require('@controllers');

// QUESTION IMPORT
const { CreateQuestion, ReadQuestions, ReadQuestion, UpdateQuestion, DeleteQuestion } = require('@controllers');

// USER QUESTION IMPORT
const { CreateUserQuestion, ReadUserQuestions, ReadUserQuestion, UpdateUserQuestion, DeleteUserQuestion } = require('@controllers');

// MIDDLEWARES
const { middleware } = require('@middlewares');
const { scrapper } = require('@middlewares');

const{ScrappingFromUrl} = require('@controllers');
const{CreateRecipe,ReadRecipe} = require('@controllers');

/**
 * Routes
 */

router.post('/recipe',scrapper, CreateRecipe);
router.get('/recipe', ReadRecipe);

router.post('/signin/google', SignInWithGoogle);
router.post('/scrapper', ScrappingFromUrl);

// AUTH ROUTES
router.post('/login', LoginUser);

// TODO ROUTES
router.post('/ashtray/create', CreateAshtray);
router.get('/ashtray/read/:id', ReadOneAshtray);
router.get('/ashtray/read', ReadAshtray);
router.put('/ashtray/reset/:id', ResetAshtray);
router.patch('/ashtray/update/:id', UpdateAshtray);
router.delete('/ashtray/delete/:id', DeleteAshtray);

// QUESTION ROUTES 
router.post('/question/add', middleware, CreateQuestion);
router.get('/question/read', middleware, ReadQuestions);
router.get('/question/read/:id', middleware, ReadQuestion);
router.patch('/question/update/:id', middleware, UpdateQuestion);
router.delete('/question/delete/:id', middleware, DeleteQuestion);
module.exports = router;
