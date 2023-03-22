class Product {
    constructor(id, name, image, price, quantity) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.quantity = 1;
        this.isOnCart = false;
    }
}

async function getProducts() {
    var response = await fetch("http://192.168.1.4:8888/75/modules/RestfulApi/index.php?module=Auth&key=NEIXqqnsAdswvmYf");
    var data = await response.json();
  
    response = await fetch(`http://192.168.1.4:8888/75/modules/RestfulApi/Products/start/0/length/2/order/vtiger_products.productid%20DESC/${data.result}`);
    data = await response.json();
    console.log(data.result)
    return data.result;
}
  
const dataList = await getProducts();
const Products = [];

dataList.map(elem => {
    let Product = new Product(elem.record_id, elem.productname, elem.imagename, elem.unit_price);
    Products.push(Product);
});
  
export default Products