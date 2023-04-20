import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'

const PORT = 8080;

const app = express();

app.engine('handlebars',handlebars.engine());

app.set('views',__dirname+'/views');

app.set('view engine','handlebars');

app.use(express.json());

app.use(express.urlencoded({extended:true})); 

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

app.use('/api/product',productRouter);
app.use('/api/carts',cartRouter);
app.use('/',viewsRouter);