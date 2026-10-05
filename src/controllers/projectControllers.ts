import { Response, Request } from "express";
import * as projectServices from "../services/projectServices"
import { projects, new_project } from "../types/app.types";
import { getUserById } from "./usersControllers";

// 1. Create project
export const addProject = async (req: Request, res: Response) => {
    try {
        // 1. Extract the logged-in user's ID from your auth middleware payload
        const loggedInUserId = req.tokenData?.userId;

        if (!loggedInUserId) {
            return res.status(401).json({ message: "Unauthorized. Missing user session token." });
        }

        // 2. Destructure the rest of the project details from the request body
        const { name, description, project_status, created_at } = req.body;

        // 3. Pass a complete object containing the body parameters AND the verified userId
        const newProject = await projectServices.createProject({
            name,
            description,
            userId: loggedInUserId, //  This fixes the null issue!
            project_status,
            created_at
        });
        
        if (!newProject) {
            return res.status(400).json({ message: "Project could not be created." });
        }
        
        return res.status(201).json(newProject);

    } catch (error) {
        console.error("Controller Error:", error); 
        return res.status(500).json({ message: "Error Creating a Project" });
    }
};

// 2. List all projects
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const Projects = await projectServices.findAllProjects()
        res.status(200).json(Projects)
    } catch (error) {
        res.status(500).json({ message: "Error Retrieving Projects" })
    };
};

// 3. Assign user to project
export const addProjectMember = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id as string);
        const { userId } = req.body; // Sent in JSON body {"userId": 5}

        if (!userId) {
            return res.status(400).json({ message: "userId is required in request body" });
        }

        await projectServices.assignMemberToProject(projectId, userId);
        return res.status(200).json({ message: "User assigned to project successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error assigning user to project" });
    }
};

// 4. Remove user from project
export const removeProjectMember = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id as string);
        const userId = parseInt(req.params.userId as string);

        await projectServices.removeMemberFromProject(projectId, userId);
        return res.status(200).json({ message: "User removed from project successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error removing user from project" });
    }
};
