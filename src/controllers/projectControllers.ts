import { Response, Request } from "express";
import * as projectServices from "../services/projectServices"
import { projects, new_project } from "../types/app.types";
import { getUserById } from "./usersControllers";

export const addProject = async (req: Request, res: Response) => {
    try {
        const newProject = await projectServices.createProject(req.body);
        
        // 1. Check if the project creation failed
        if (!newProject) {
            return res.status(400).json({ message: "Project could not be created." });
        }
        
        // 2. If successful, send the response and return
        return res.status(201).json(newProject);

    } catch (error) {
        console.error(error); // 👈 This will show the actual database/code error in your terminal!
        return res.status(500).json({ message: "Error Creating a Project" });
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const Projects = await projectServices.findAllProjects()
        res.status(200).json(Projects)
    } catch (error) {
        res.status(500).json({ message: "Error Retrieving Projects" })
    };
};
