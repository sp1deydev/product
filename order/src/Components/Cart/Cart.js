import React from "react"
import CartList from "./CartList/CartList"


function Cart(props) {
    const { addToCart, updateCartItems, changeValue, tabId, currentTabId } = props;


    return (
        <React.Fragment>
            <CartList 
                addToCart={addToCart}
                updateCartItems={updateCartItems}
                changeValue={changeValue}
                tabId={tabId}
                currentTabId={currentTabId}
            />
        </React.Fragment>
    );
}

export default Cart