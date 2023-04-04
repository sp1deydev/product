import ProductFooter from "./ProductFooter/ProductFooter"
import ProductHeader from "./ProductHeader/ProductHeader"
import ProductList from "./ProductList/ProductList"
import React, { useState } from "react"

function Product(props) {
    const [type, setType] = useState(""); //catagory variable
    const [currentCustomers, setCurrentCustomers] = useState([]); //current Customers

    const onAddToCart = (product) => {
        props.onAddToCart(product);
    };
    console.log("CartItems:",props.CartItems);
    //get the category from product header component
    const getCategory = (category) => {
        setType(category);
    }
    function setCurrentCus(cus){
        setCurrentCustomers(cus);
    }
    return (
        <React.Fragment>
            <ProductHeader setCurrentCus = {setCurrentCus} getCategory={getCategory}/>
            <ProductList onAddToCart={onAddToCart} category={type} />
            <ProductFooter CartItems = {props.CartItems} currentCustomers = {currentCustomers} />
        </React.Fragment>
    );
}

export default Product