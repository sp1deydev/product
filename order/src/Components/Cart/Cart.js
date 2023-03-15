import React from "react"
import CartFooter from "./CartFooter/CartFooter"
import CartList from "./CartList/CartList"


function Cart(props) {
    return (
        <React.Fragment>
            <CartList/>
            <CartFooter/>
        </React.Fragment>
    )
}

export default Cart