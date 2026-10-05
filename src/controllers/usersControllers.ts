import { Response, Request } from "express";
import * as usersServices from '../services/usersServices'
import { Await } from "react-router-dom";
import bcrypt from "bcryptjs";
import   jwt  from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
    const {name, email, password, role} = req.body
    if (!name || !email || !password ||!role){
        return res.status(400).json({message: `${name}, ${email}, ${password}, ${role} Required!`})
    }
    try {
        const existingUser = await usersServices.findUserByEmail(req.body)
        if (existingUser){
            return res.status(409).json({message: "Email is already in use"})
        }
        const user = await usersServices.createUser(name, email, password, role)

        res.status(201).json({message: "user created successfully", userId: user.id})

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error Creating a User" });
    };
};

export const loginUser = async(req: Request, res: Response) =>{
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({message: "Email and Password is required"})
    }
      try {
        // 1. Added 'await' here so 'user' becomes the actual object, not a Promise
        const user = await usersServices.findUserByEmail(email);

        // 2. Fix: Check if the user was actually found in the database
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 3. This will now work because 'user' is resolved
        const isMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const payload = {userId: user.id, email: user.email, password: user.password}
        const token =  jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h"
        })
       
        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging in..." });
    }
};



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