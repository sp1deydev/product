import ProductFooter from "./ProductFooter/ProductFooter"
import ProductHeader from "./ProductHeader/ProductHeader"
import ProductList from "./ProductList/ProductList"
import React from "react"

function Product(props) {
    const onAddToCart = (product) => {
        props.onAddToCart(product);
    };
    
    return (
        <React.Fragment>
            <ProductHeader/>
            <ProductList onAddToCart={onAddToCart}/>
            <ProductFooter/>
        </React.Fragment>
    );
}

export default Product