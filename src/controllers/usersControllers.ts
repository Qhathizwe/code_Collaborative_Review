import { Response, Request } from "express";
import * as usersServices from '../services/usersServices'
import { Await } from "react-router-dom";

export const addUser = async (req: Request, res: Response) => {
    try {
        const newUser = await usersServices.createUser(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error Creating a User" });
    };
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await usersServices.findAllUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Error Retrieving Users" })
    };
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string)
        const user = await usersServices.findUserById(id)

        if (!user) {
            return res.status(404).json("User not found")
        }
        res.status(200).json(user)
    } catch (error) {

        res.status(500).json({ message: "Error Retrieving Users by ID" })
    }
}

export const updateUserById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string)
        const updateUser = await usersServices.updateUser(id, req.body)
        if (!updateUser) {
            return res.status(404).json("User not found")
        }
        return res.status(200).json("User updated succesfully")
    } catch (error) {

         console.error(error);
        res.status(500).json({ message: "Error Retrieving Users by ID" })
    };
};

export const deleteById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const deleteUser = await usersServices.deleteUser(id);
        if (!deleteUser) {
            return res.status(404).json("User not found");
        }
        return res.status(200).json({message: "User deleted succesfully!"});
    } catch (error) {
        res.status(500).json({ message: "Error deleting Users by ID" }) 
    }
}