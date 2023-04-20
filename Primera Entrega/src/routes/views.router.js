import Router from 'express';
import productManager from '../Managers/ProductManager.js'

const router = Router();

const product = new productManager();

router.get('/',async(req,res)=>{
    const pro =await product.getProducts();
    res.render('home',{pro});
});

export default router;