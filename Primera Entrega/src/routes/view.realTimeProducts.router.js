import Router from 'express';
import ProductManager from '../Managers/ProductManager.js'

const router = Router();

const product = new ProductManager();


router.post('/',async(req,res)=>{
    
    res.render('realTimeProducts');
});

export default router;