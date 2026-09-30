import Router from 'express'

import {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteById
} from '../controllers/usersControllers'

const router = Router()

router.post('/users', addUser)

router.get("/users", getAllUsers )
router.get("/users/:id", getUserById)
router.put("/users/:id", updateUserById)
router.delete("/users/:id", deleteById)

export default router