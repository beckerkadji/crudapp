import  {Request, Response, NextFunction} from 'express';
import userdb from '../model/user';
import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

class UserController {

    getALLUsers(req:Request, res:Response){
        axios.get('api/users')
            .then(function (response) {
                res.render('index',{users:response.data});
            })
            .catch(err => {
                res.send(err);
            })
    }

    addUserPage(req:Request, res:Response){
        res.render('add-user');
    }

    updateUserPage(req:Request, res:Response){
        axios.get('api/users',{params : {id: req.query.id}})
            .then(function (userdata) {
                res.render("update-user",{user: userdata.data})
            })
            .catch(err =>{
                res.send(err);
            })
    }

    createUser(req:Request, res:Response){
        //validate request
        if(!req.body){
            res.status(400).send({message: "Content can not be empty !"});
            return;
        }

        // new user
        const user = new userdb ({
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                status: req.body.status,
            })
        ;

        //save user in the database
        // @ts-ignore
        user.save(user)
            .then(data => {
                // res.send(data)
                res.redirect('/omega/add-user')
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message ||"Some error occurred while creating operation"
                })
            })
    }

    findUser(req:Request, res:Response){
        if(req.query.id){
            const id = req.query.id;

            userdb.findById(id)
                .then(data => {
                    if(!data){
                        res.status(404).send({
                            message: `Not found user with id ${id}`
                        })
                    }else{
                        res.send(data)
                    }
                })
                .catch(err =>{
                    res.status(500).send({
                        message : `error retrieving user with id ${id}`
                    })
                })
        }else{
            userdb.find()
                .then(user => {
                    res.send(user)
                })
                .catch(err => {
                    res.status(500).send({message: err.message || "Error occurred while retriving user information"})
                })
        }
    }

    updateUser(req:Request, res:Response){
        if(!req.body){
            res.status(400).send({message: "Data to update can not be empty !"});
            return;
        }
        const id = req.params.id;
        userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
            .then(data =>{
                if(!data){
                    res.status(404).send({message:`Cannot Update user with ${id}. Maybe user note found!`})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error Update user information"})
            })
    }

    deleteUser(req:Request, res:Response){
        const id = req.params.id;

        userdb.findByIdAndDelete(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message: `Cannot Delete with id ${id}.Maybe id is wrong`})
                }else{
                    res.send({
                        message: "User was deleted succefully!"
                    })
                }
            })
            .catch(err =>{
                res.status(500).send({
                    message: `Could not delete User with id = ${id}.`
                });
            });
    }
}
const userController = new UserController();

export default userController;