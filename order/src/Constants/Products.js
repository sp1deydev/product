class Product {
  constructor() {
      this.quantity = 1;
      this.isOnCart = false;
  }
}

async function getProducts() {
  var response = await fetch("http://192.168.1.12:8888/75/modules/RestfulApi/index.php?module=Auth&key=NEIXqqnsAdswvmYf");
  var data = await response.json();

  response = await fetch(`http://192.168.1.12:8888/75/modules/RestfulApi/Products/start/0/length/20/order/vtiger_products.productid%20DESC/${data.result}`);
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

// //Products for test
// const Products = [
//   {
//     "id": 1,
//     "name": "Iphone 11 64GB",
//     "image": "https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-tim-200x200.jpg",
//     "price": 2000,
//     "quantity": 1,
//     "isOnCart": false
//   },
//   {
//     "id": 2,
//     "name": "Samsung S22 5G 128GB",
//     "image": "https://cdn.tgdd.vn/Products/Images/42/231110/Galaxy-S22-Black-600x600.jpg",
//     "price": 1500,
//     "quantity": 1,
//     "isOnCart": false
//   },
//   {
//     "id": 3,
//     "name": "Xiaomi Redmi Note 10S 8GB",
//     "image": "https://cdn.tgdd.vn/Products/Images/42/235969/xiaomi-redmi-note-10s-xanh-1-200x200.jpg",
//     "price": 800,
//     "quantity": 1,
//     "isOnCart": false
//   },
//   {
//     "id": 4,
//     "name": "Huawei P50 Pro 5G",
//     "image": "https://cdn.tgdd.vn/Products/Images/42/226196/huawei-p50-pro-600x600.jpg",
//     "price": 1320,
//     "quantity": 1,
//     "isOnCart": false
//   },
//   {
//     "id": 5,
//     "name": "Oppo Reno5 5G",
//     "image": "https://cdn.tgdd.vn/Products/Images/42/233460/oppo-reno5-5g-thumb-600x600.jpg",
//     "price": 1234,
//     "quantity": 1,
//     "isOnCart": false
//   },
//   {
//     "id": 6,
//     "name": "Samsung Galaxy Z Flip3 5G 128GB",
//     "image": "https://cdn.tgdd.vn/Products/Images/42/229949/samsung-galaxy-z-flip-3-violet-1-200x200.jpg",
//     "price": 3500,
//     "quantity": 1,
//     "isOnCart": false
//   },
// ]




export default Products