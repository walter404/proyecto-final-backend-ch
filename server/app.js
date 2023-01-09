import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './src/config/config.js';
import dotenv from 'dotenv';
dotenv.config();

//para poder utilizar __dirname y obtener los archivos publicos
 import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//inicializa express
const app = express();

//enable cors
//cors config
/* app.use(cors()); */
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//inicioalizo MongoAtlas
import MongoStore from 'connect-mongo';
/* const MongoStore = require("connect-mongo"); */
const advanceOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//inicializo conexion a la base de datos para las sessiones
app.use(cookieParser('secretcode'));
let mongoUrl = config.databaseUrl;
//let mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

//middleware para manejar las sesiones
app.use(

  session({
    store: new MongoStore({ 
      mongoUrl: mongoUrl,
      mongoOptions: advanceOptions   
    }),
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    rolling: true, //cada vez que se hace una petición se renueva el tiempo de expiración
    //cookie: { maxAge: 60000000 }, //tiempo de expiración de la cookie
    cookie: { maxAge: config.time }, //tiempo de expiración de la cookie - 10 minutos
  })

);

//middleware para inicializar passport y unir session con passport
app.use(passport.initialize());
app.use(passport.session());

//importo el router (index.js)
import {router} from './src/routes/index.js';

//seteo de plantilla
app.set('views',( './views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json()); //para poder recibir json
app.use(express.urlencoded({ extended: true })); //para poder recibir datos de formularios
app.use("/", router);

//importar socket.io e inicializar con CORS
import { createServer } from 'http';
import { Server } from 'socket.io';
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});



//Funciones del chat --> pasar a controllers
import { getChat, sendMessage } from './src/controllers/chat.js';

io.on('connection', async function(socket) {
  //mensaje en consola cuando se conecta un usuario
  console.log('Un cliente se ha conectado'); 
  //primera conexion del usuario recibe los mensajes de la DB
  const messages = await getChat();  
  socket.emit('messages', messages); 

  //escucho el los mensajes del cliente, lo agrego a la db  y le paso a TODOS (io.sockets.emit) los clientes los mensajes
  socket.on ('new-message', async function (data){    
    sendMessage(data)
    .then(async (newMessage) => {             
      const messages = await getChat();  
      io.sockets.emit('messages', messages);
    })   
    
  });

});

//levanto el servidor
const port = config.port;

httpServer.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});

export default app;
