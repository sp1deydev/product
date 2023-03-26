class Customer {
    constructor() {

    }
}

async function getCustomers() {
  var response = await fetch(`${process.env.REACT_APP_API_URL}modules/RestfulApi/index.php?module=Auth&key=${process.env.REACT_APP_API_KEY}`);
  var data = await response.json();

  response = await fetch(`${process.env.REACT_APP_API_URL}modules/RestfulApi/Contacts/Contactid/${data.result}`);
  data = await response.json();
  return data.result;
}

const cumstomersList = await getCustomers();
const Customers = [];

cumstomersList.map(elm => {
  var customer = new Customer();
  customer.account_id = elm.account_id;
  customer.firstname = elm.firstname;
  customer.lastname = elm.lastname;
  customer.label = elm.label;
  customer.phone = elm.phone;
  customer.email = elm.email;
  customer.mailingstreet = elm.mailingstreet;
  customer.birthday = elm.birthday;
  Customers.push(customer);
});


export default Customers