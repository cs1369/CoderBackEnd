import { Router } from 'express';
import CartManager from '../Managers/CartManager.js';

const router = Router();


const carts = new CartManager();

router.get('/:cid',async(req,res)=>{
    let idCart = req.params.cid;
    res.send(await carts.getCartsById(idCart));
});

router.post('/',async(req,res)=>{
    try {
        await carts.createCart();
        res.send('Se creo un nuevo carrito.');
    } catch (error) {
        res.send(error);
    }
    
});

router.post('/:cid/product/:pid',async(req,res)=>{
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    try {
        await carts.addProductCart(idCart,idProduct);
        res.send('Se Cargo el producto');
    } catch (error) {
        res.send(error);
    }
    
});

export default router;