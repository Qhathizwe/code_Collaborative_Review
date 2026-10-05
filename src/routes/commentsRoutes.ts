import { Router } from "express";
import { protect } from "../middleware/userMiddleware";
import { 
    addComment, 
    getCommentsBySubmissionId, 
    updateCommentById,
    deleteCommentById 
     
} from "../controllers/commentsControllers";

const router = Router();

router.use(protect as any);

router.post("/submissions/:id/comments", addComment);                       // Create comment
router.get("/submissions/:id/comments", getCommentsBySubmissionId);               // get commment by submission
router.put("/comments/:id", updateCommentById);     // Update comment by id
router.delete("/comments/:id", deleteCommentById);               // Delete comment by id

export default router;