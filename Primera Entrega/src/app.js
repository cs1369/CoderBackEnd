import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import viewAddProduct from './routes/view.addProducts.router.js'
import viewRealTime from './routes/view.realTimeProducts.router.js'
import {Server} from 'socket.io';
import ProductManager from './Managers/ProductManager.js';

const PORT = 8080;

const app = express();

const product = new ProductManager();

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


socketServerIO.on('connection',async(socket)=>{
    console.log('Usuario conectado');
        let data = await product.getProducts();
        socket.emit("message",data);

    socket.on("add",async(producto)=>{
        console.log(producto)
        /* await product.addProducts(producto); */
        let data = await product.getProducts(); 
        socket.broadcast.emit("message",data); 
    });
});



app.use('/api/product',productRouter);
app.use('/api/carts',cartRouter);
app.use('/',viewsRouter);
app.use('/addProducts',viewAddProduct);
app.use('/realTimeProducts',viewRealTime);
