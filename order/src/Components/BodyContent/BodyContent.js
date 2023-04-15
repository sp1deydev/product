import { Layout, Menu, Col, Row, Input, Tabs } from 'antd';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { useState, useRef } from 'react';

const { Header, Content, Footer } = Layout;

function BodyContent(props) {
    const [addToCart, setAddToCart] = useState(1);
    //giá trị thay đổi để useEffect của component CartList chạy
    const [changeValue, setChangeValue] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    //ACTION 
    //add to cart action
    const onAddToCart = (product) => {
        console.log("addToCart 2:",addToCart)
        console.log("changeValue",changeValue)
        console.log(product)
        if(changeValue === 2)
        setChangeValue(0);
        setChangeValue(changeValue + 1);
        setAddToCart(product);
        setCartItems(product);
        console.log("end")
    };
    function  updateCartItems(data) {
        setCartItems(data);
    }

return (
    <Content style={{background: 'grey'}}>
        <div className="site-layout-content">
        <Row gutter={8}>
            <Col span={13} >
            <div className="main-content-display">
                <Cart addToCart={addToCart} updateCartItems={updateCartItems}  changeValue={changeValue} currentTabId={props.currentTabId} tabId={props.tabId}/>
            </div>
            </Col>
            <Col span={11}>
            <div className="main-content-display">
                <Product updateCartItems={updateCartItems}  CartItems = {cartItems}/> {/* has bug */}
            </div>
            </Col>
        </Row>
        </div>
    </Content>
)
}

export default BodyContent