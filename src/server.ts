import colors from 'colors'
import express from 'express'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import { router } from './router'
import  db  from './conifg/db'
//conectar db

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue('Conexion exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log(colors.bgRed.bold('hubo un error'))
    }
}
connectDB()

const server = express()
//Permite conexion

const corsOption : CorsOptions= {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error Cors'))
        }
    }
}
server.use(cors(corsOption))
//Leer datos de formulario 
server.use(express.json())
server.use(morgan('dev'))

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})

export default server