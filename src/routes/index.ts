import express from 'express';
import userController from '../controller/userController';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from '../swagger.json';

const addUser:express.Router = express.Router(); 


/** 
 * @description get page we have all user
 * @method GET /
 */
addUser.get('/', userController.getALLUsers);

/** 
 * @description to get page where we add a user
 * @method GET /add-user
 */
addUser.get('/add-user',userController.addUserPage);

/** 
 * @description to get page where we update a user
 * @method GET /update-user
 */
addUser.get('/update-user',userController.updateUserPage);

/**
 * @description to get swagger documentation of API
 * @method Use /docs-api
 */
addUser.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//API 
 addUser.post('/api/users',userController.createUser);
 addUser.get('/api/users',userController.findUser);
 addUser.put('/api/users/:id',userController.updateUser);
 addUser.delete('/api/users/:id',userController.deleteUser);


export default addUser;