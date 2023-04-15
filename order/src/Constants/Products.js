/* eslint-disable array-callback-return */
async function getProducts() {
  var response = await fetch(
    `${process.env.REACT_APP_API_URL}modules/RestfulApi/index.php?module=Auth&key=${process.env.REACT_APP_API_KEY}`
  );
  var data = await response.json();

  response = await fetch(
    `${process.env.REACT_APP_API_URL}modules/RestfulApi/Products/start/0/length/20/order/vtiger_products.productid/DESC/${data.result}`
  );
  data = await response.json();
  return data.result;
}

const dataList = await getProducts();
const Products = [];

dataList.map((elem) => {
  Products.push({
    id: elem.record_id,
    name: elem.productname,
    image: elem.imagename,
    price: elem.unit_price,
    display_price: elem.unit_price,
    purchase_cost: elem.purchase_cost,
    category: elem.productcategory,
    quantity: 1,
    discount_amount: 0,
    discount_percent: 0,
    note: '',
    isOnCart: false,
  });
});

export default Products;
