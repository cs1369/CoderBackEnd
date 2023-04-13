import { Router } from 'express';
import ProductManager from '../Managers/ProductManager.js';

const router = Router();

const product = new ProductManager();

router.get('/',async (req,res)=>{

    res.send(await product.getProducts());
});

router.post('/',async(req,res)=>{
    const newproduct= req.body;
    await product.addProducts(newproduct);
    const getProducts = await product.getProducts()
    res.send({
        status: 'Success',
        getProducts
    });
});

router.put('/:pid',async(req,res)=>{
    const idProduct = req.params.pid;
    const uProduct = req.body;
    await product.updateProduct(idProduct,uProduct);
    res.send(await product.getProducts());
});

router.delete('/:pid',async(req,res)=>{
    const idProduct = req.params.pid;
    await product.deleteProduct(idProduct);
    res.send(await product.getProducts());
});

export default router;