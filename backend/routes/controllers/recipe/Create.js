const { secureInput, formatChecker } =require('@core');
const { RecipeModel } = require('@models');
/**
 * Request structure
 * req = { body: {text:string, proposal_a:string, proposal_b:string, userId: string, lifeTime : mm/dd/yyyy } }
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

    if (req.body.title === undefined || req.body.title === null){
        throw new Error('title undefinded/null');
    }
    inputs.title = req.body.title;

    if(req.body.img === undefined || req.body.img === null){
        throw new Error('img a undefined/null');
    }
    inputs.img = req.body.img;

    inputs.preparation_list = req.body.preparation_list;

    inputs.ingredients_list = req.body.ingredients_list;

    return inputs;
  };
  
  /**
   * PROCESS :
   */
  const process = async (inputs) => {
      try{
        const newRecipe = await RecipeModel.create(inputs);

        return newRecipe;
    }catch(error) {
          throw new Error('Recipe  can\'t be create'.concat(' > ', error.message));
      }
  };
  
  /**
   * LOGIC :
   */
  const Create = async (req, res) => {
    try {
      const inputs = await secure(req);
  
      const param = await process(inputs);

  
      res.status(200).json(param);
    } catch (error) {
      console.log("ERROR MESSAGE :", error.message);
      console.log("ERROR :", error);
      res.status(400).json({ message: error.message });
    }
  };
  module.exports = Create;