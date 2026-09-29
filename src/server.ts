import express from 'express'
import dotenv from 'dotenv'

import { testDBConnection } from './config/database'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

const startServer = async () => {
    app.use(express.json());

    await testDBConnection()

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
};

startServer()