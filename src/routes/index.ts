import express from 'express';
import controller from '../controller/userController'

const addUser:express.Router = express.Router(); 


/** 
 * @description get page we have all user
 * @method GET /
 */
addUser.get('/', controller.getAllUsers);

/** 
 * @description to get page where we add a user
 * @method GET /add-user
 */
addUser.get('/add-user',controller.addUserPage);

/** 
 * @description to get page where we update a user
 * @method GET /update-user
 */
addUser.get('/update-user',controller.updateUserPage);

//API 
 addUser.post('/api/users',controller.createUser);
 addUser.get('/api/users',controller.findUser);
 addUser.put('/api/users/:id',controller.updateUser);
 addUser.delete('/api/users/:id',controller.deleteUser);


export default addUser;