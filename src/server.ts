import express from 'express'
import dotenv from 'dotenv'

import { testDBConnection } from './config/database'

import usersRoutes from './routes/usersRoutes'
import projectRoutes from './routes/projectRoutes'

import { createUsersTable } from './services/usersServices'
import { createProjectTable } from './services/projectServices'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

const startServer = async () => {
    app.use(express.json());

    await testDBConnection()

    const creatingTables = async () => {

            await createUsersTable()
            await createProjectTable()
    }
    
    creatingTables()


    app.use('/api', usersRoutes)
    app.use('/api', projectRoutes)

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
};

startServer()