import ProductFooter from "./ProductFooter/ProductFooter"
import ProductHeader from "./ProductHeader/ProductHeader"
import ProductList from "./ProductList/ProductList"
import React from "react"

function Product(props) {
    return (
        <React.Fragment>
            <ProductHeader/>
            <ProductList/>
            <ProductFooter/>
        </React.Fragment>
    )
}

export default Product