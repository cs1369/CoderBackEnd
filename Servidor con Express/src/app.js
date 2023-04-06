import ProductManager from "./productsManager.js";
import express from 'express';

const PORT = 8080;
const app = express();
const productos = new ProductManager();
app.use(express.urlencoded({extended:true}));

app.listen(PORT,()=>{
    console.log('Conectado al servidor.');
  
});

app.get('/products',async(req,res)=>{
    let limit = req.query.limit;
    let productosLimit = [];
    const prods = await productos.getProducts();
    if(limit){
        for (let i = 0; i < limit; i++) {
            usuarioLimit.push(prods[i]);           
        }
        res.send(productosLimit);
    }else{
        res.send(prods);
    }

});

app.get('/products/:pid',async(req,res)=>{
    const prods = await productos.getProducts();
    let idProducto = req.params.pid;
    let producto= prods.find(p => p.id == idProducto);
    if(!producto) return res.send({error:"el Producto no se encontro"});

    res.send(producto);
})