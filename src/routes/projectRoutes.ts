import { Router } from "express";
import { protect } from "../middleware/userMiddleware";
import { 
    addProject, 
    getAllProjects, 
    addProjectMember, 
    removeProjectMember 
} from "../controllers/projectControllers";

const router = Router();

// Apply auth protection globally across all endpoints
router.use(protect as any);

// Create and List Projects
router.post("/", addProject);
router.get("/", getAllProjects);

//  Assign user to project (/api/projects/:id/members)
router.post("/:id/members", addProjectMember);

// Remove user from project (/api/projects/:id/members/:userId)
router.delete("/:id/members/:userId", removeProjectMember);

export default router;
