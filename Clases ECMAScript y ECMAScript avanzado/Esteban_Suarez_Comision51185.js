class ProductManager{
  constructor(){
    this.products = [];
  }

  addProduct(title,description,price,thumbnail,code,stock){
    let id = parseInt(this.products.length);
    /* const duplicados = ()=>{
      for (const producto of this.products) {
        
      }
    } */
    const duplicados = this.products.filter((producto)=>(producto.code == code))

    if(!title || !description || !price || !thumbnail || !code || !stock){
      return console.log('Todos los campos son obligatorios');
    }
    else if(!isNaN(price)){
      if(!isNaN(stock)){
        if(duplicados.length === 0){
          let producto = {
            id : ++id,
            title : title,
            description: description,
            price : price,
            thumbnail : thumbnail,
            code : code,
            stock: stock
          }
      
          this.products.push(producto);
        }else{
          return console.log("el campo 'code' no se puede repetir con otros productos.");
        }
      }else{
        return console.log("el campo 'stock' de ver numerico.");
      }
    }else{
      return console.log("el campo 'price' de ver numerico.");
    }
    
  }

  getProducts(){
    return this.products;
  }
  getProductById(id){
    let productById = this.products.find((producto)=>(producto.id == id));
    if(productById){
      return productById;
    }
    else{
      return console.log("Not Found");
    }
  }
}
let productos = new ProductManager();

/* CARGA PAR VALIDAR QUE EL CAMPO CODE NO SE REPITA */
productos.addProduct('Mouse','Mouse Gamer',5,'google.com','e345g3',20);
productos.addProduct('Mouse','Mouse Gamer',5,'google.com','e345g3',20);
productos.addProduct('Mouse','Mouse Gamer',5,'google.com','e345g3',20);
productos.addProduct('Mouse','Mouse Gamer',5,'google.com','e345g3',20);
/*CARGA PARA VALIDAR CAMPOS NOT NULL Y CAMPOS NUMERICOS */
productos.addProduct('teclado','teclado Gamer',24,'google.com','e2332323',4);
productos.addProduct('Monitor','Monitor Gamer',5,'google.com','11114',2);
productos.addProduct('Monitor','Monitor Gamer','e2r','google.com','11114',2);
productos.addProduct('Monitor','Monitor Gamer',5,'google.com','11114');
console.log(productos.getProducts());
console.log(productos.getProductById(2));