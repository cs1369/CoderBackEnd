import { Router } from 'express';
import ProductManager from '../Managers/ProductManager.js';
import { uploader } from '../utils.js';

const router = Router();

const product = new ProductManager();

router.get('/',async (req,res)=>{

    res.send(await product.getProducts());
});

router.post('/',uploader.single('thumbnail'),async(req,res)=>{
    const archivo = `http://localhost:8080/img/${req.file.filename}`
    const newproduct= {
        title: req.body.title,
		description: req.body.description,
		code: req.body.code,
		price: req.body.price,
		status: true,
		stock: req.body.stock,
		category: req.body.category,
		thumbnails: archivo
    }
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