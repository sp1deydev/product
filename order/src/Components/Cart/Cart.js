import React from "react"
import CartFooter from "./CartFooter/CartFooter"
import CartList from "./CartList/CartList"


function Cart(props) {
    const { addToCart, changeValue } = props;
    return (
        <React.Fragment>
            <CartList 
                addToCart={addToCart}
                changeValue={changeValue}
            />
            <CartFooter/>
        </React.Fragment>
    );
}

export default Cart