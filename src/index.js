
import express from 'express';
import productRouter from './routes/products.routes';
import carritoRouter from './routes/carrito.routes';
import multer from 'multer';
import { _dirname } from './path';
import { engine } from 'express-handlebars'; //Configuracion basica de handlebars
import * as path from 'path'
import {Server} from 'socket.io'


const app = express()
const PORT = 4000
const storage = multer.diskStorage({
    destination: (req, file, cb) => { //Destino de mis imagenes cargadas
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

const server = app.listen(PORT, ()=>{
    console.log (`Server on Port ${PORT}`)
})

//Configuracion hbs
app.engine('handlebars', engine())
app.set('view engine', 'handlebars') //Asigno valores a la constante - Vistas de hbs
app.set('views', path.resolve(_dirname, './views')) //Concateno con resolve - src/views


//Middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const upload = (multer({ storage: storage})) //Instancio un objeto con la configuracion previa de multer

//Server IO
const io = new Server(server, {cors: {origin: "*"}})
const mensajes = []

io.on('connection', (socket) =>{
    console.log("Cliente Conectado")
    socket.on("mensaje", info =>{
        console.log(info)
        // mensajes.push(info)
        // io.emit("mensajes", mensajes)
    })
    socket.on("Nuevo Producto", (prod) =>{
        console.log(prod) //Checkear
    })
})

app.use((req, res, next) =>{
    req.io = io
    next()
})

//Routes
app.use('/product', productRouter)
app.use('/product', express.static(_dirname + '/public'))
app.use('/carrito', carritoRouter)
app.post('/upload', upload.single('product'), (req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")
})

//HBS
app.get("/", (req, res) =>{
    res.render('index')
})

