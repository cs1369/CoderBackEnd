import Router from 'express';
import ProductManager from '../Managers/ProductManager.js'

const router = Router();

const product = new ProductManager();


router.get('/',async(req,res)=>{ 
    const pro = await product.getProducts();
    res.render('home',{pro});
});

export default router;