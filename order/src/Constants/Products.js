class Product {
  constructor() {
      this.quantity = 1;
      this.isOnCart = false;
  }
}

async function getProducts() {
  var response = await fetch(`${process.env.REACT_APP_API_URL}modules/RestfulApi/index.php?module=Auth&key=${process.env.REACT_APP_API_KEY}`);
  var data = await response.json();

  response = await fetch(`${process.env.REACT_APP_API_URL}modules/RestfulApi/Products/start/0/length/20/order/vtiger_products.productid/DESC/${data.result}`);
  data = await response.json();
  return data.result;
}

const dataList = await getProducts();
const Products = [];

console.log(dataList);
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