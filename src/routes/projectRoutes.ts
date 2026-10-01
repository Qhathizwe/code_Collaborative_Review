import {
    addProject,
    getAllProjects
}
from '../controllers/projectControllers'
import { Router } from 'express'

const router = Router()

router.post("/projects", addProject)
router.get("/projects", getAllProjects)

export default router