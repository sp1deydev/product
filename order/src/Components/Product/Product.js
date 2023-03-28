import ProductFooter from "./ProductFooter/ProductFooter"
import ProductHeader from "./ProductHeader/ProductHeader"
import ProductList from "./ProductList/ProductList"
import React, { useState } from "react"

function Product(props) {
    const [type, setType] = useState(""); //catagory variable

    const onAddToCart = (product) => {
        props.onAddToCart(product);
    };

    //get the category from product header component
    const getCategory = (category) => {
        setType(category);
    }
    return (
        <React.Fragment>
            <ProductHeader getCategory={getCategory}/>
            <ProductList onAddToCart={onAddToCart} category={type}/>
            <ProductFooter/>
        </React.Fragment>
    );
}

export default Product