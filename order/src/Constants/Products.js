class Product {
  constructor() {
      this.quantity = 1;
      this.isOnCart = false;
  }
}

async function getProducts() {
  var response = await fetch("http://192.168.1.4:8888/75/modules/RestfulApi/index.php?module=Auth&key=NEIXqqnsAdswvmYf");
  var data = await response.json();

  response = await fetch(`http://192.168.1.4:8888/75/modules/RestfulApi/Products/start/0/length/20/order/vtiger_products.productid%20DESC/${data.result}`);
  data = await response.json();
  return data.result;
}

const dataList = await getProducts();
const Products = [];


dataList.map(elem => {
  var product = new Product();
  product.id = elem.record_id;
  product.name = elem.productname;
  product.image = elem.imagename;
  product.price = elem.unit_price;
  product.category = elem.productcategory

  Products.push(product);
});

export default Products