import Router from 'express'

import {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteById,
} from '../controllers/usersControllers'

const router = Router()

router.post('/auth/register', registerUser)
router.post("/auth/login", loginUser)

router.get("/users", getAllUsers )
router.get("/users/:id", getUserById)
router.put("/users/:id", updateUserById)
router.delete("/users/:id", deleteById)

export default router