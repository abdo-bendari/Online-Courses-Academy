import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dbConnection from './database/dbConnection.js'
import bootstrap from './src/modules/bootstrap.js'
const app = express()
dbConnection.sync({alter : true})
app.use(cors())
app.use(helmet())
app.use(morgan("common"))
bootstrap(app,express)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))