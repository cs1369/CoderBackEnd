import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import viewRealTime from './routes/view.realTimeProducts.router.js'
import {Server} from 'socket.io';

const PORT = 8080;

const app = express();

app.use(express.static(__dirname+'/public'));

app.engine('handlebars',handlebars.engine());

app.set('views',__dirname+'/views');

app.set('view engine','handlebars');

app.use(express.json());

app.use(express.urlencoded({extended:true})); 



const server = app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

const socketServerIO = new Server(server);

socketServerIO.on('connection',socket=>{
    console.log('Usuario conectado');
});



app.use('/api/product',productRouter);
app.use('/api/carts',cartRouter);
app.use('/',viewsRouter);
app.use('/realTimeProducts',viewRealTime);