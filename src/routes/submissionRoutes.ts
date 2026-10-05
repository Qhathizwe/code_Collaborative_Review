import { Router } from "express";
import { protect } from "../middleware/userMiddleware";
import { 
    addSubmission, 
    getSingleSubmission, 
    modifySubmissionStatus, 
    deleteSubmission 
} from "../controllers/submissionControllers";

const router = Router();

router.use(protect as any);

router.post("/", addSubmission);                       // Create submission
router.get("/:id", getSingleSubmission);               // View single submission
router.put("/:id/status", modifySubmissionStatus);     // Update status
router.delete("/:id", deleteSubmission);               // Delete submission

export default router;
