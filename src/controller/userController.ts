import  {Request, Response, NextFunction} from 'express';
import userdb from '../model/user';


const getAllUsers = (req:Request, res:Response, next: NextFunction) => {
    res.render('index');
    next();
}

const addUserPage = (req:Request, res:Response, next: NextFunction) => {
    res.render('add-user');
    next();
}

const updateUserPage = (req:Request, res:Response, next: NextFunction) => {
    res.render('update-user');
    next();
}

//create and  save new user
const createUser = (req:Request, res:Response, next: NextFunction) => {
    //validate request
    if(req.body){
        res.status(400).send({message: "Content can not be empty !"});
        return;
    }

    // new user
    const user = new userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.Gender,
        status: req.body.status
    });

    //save user in the database
    user.save(user)
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message ||"Some error occurred while creating operation"
            })
        })
}

//retrive and return all users/ retrive and return a single user
const findUser = (req:Request, res:Response, next: NextFunction) => {

}

//Update a new identified user by user id
const updateUser = (req:Request, res:Response, next: NextFunction) => {

}

//Delete a user with specified user id in the request
const deleteUser = (req:Request, res:Response, next: NextFunction) => {

}

export default { getAllUsers, addUserPage, updateUserPage, createUser, findUser, updateUser, deleteUser };